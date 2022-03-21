const dotenv = require("dotenv");
dotenv.config();

const {
  encoder: { InteractionEncoder },
  interactions: { AnswerInteraction },
} = require("@paid-qa/spec");
const { Answer } = require("../models");
const { PostStatus } = require("../utils/constants");
const { getApi, submitRemarks } = require("../services/node.service");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_SIZE = 100;
const FLUSH_INTERVAL = 3600 * 1000;
const batches = {};

async function flushBatch(batch) {
  batch.lastFlushTime = Date.now();
  if (batch.data.length === 0) {
    return;
  }

  const api = getApi(batch.network);
  const result = await submitRemarks(
    api,
    batch.data.map((i) => i.remark)
  );

  if (result.status === "success") {
    await Answer.updateMany(
      {
        cid: {
          $in: batch.data.map((i) => i.answerCid),
        },
      },
      { status: PostStatus.Published }
    );
  }
}

async function batchSend(batch, answerCid, remark) {
  batch.data.push({ answerCid, remark });
  if (batch.data.length >= BATCH_SIZE) {
    await flushBatch(batch);
  }
}

async function submitAnswer(batch, answer) {
  const interaction = new AnswerInteraction(answer.cid);
  const remark = new InteractionEncoder(interaction).getRemark();

  await batchSend(batch, answer.cid, remark);
}

async function startSubmitAnswers(network) {
  if (batches[network]) {
    // Clear old batch data
    batches[network].data = [];
  } else {
    // Initialize batch data
    batches[network] = {
      network,
      lastFlushTime: 0,
      data: [],
    };
  }
  const batch = batches[network];

  const answers = await Answer.find({ status: PostStatus.Reserved, network });
  for (const answer of answers) {
    try {
      await submitAnswer(batch, answer);
    } catch (e) {
      console.error(e);
    }
  }
  // Force to do batch submit in intervals
  if (Date.now() - batch.lastFlushTime > FLUSH_INTERVAL) {
    await flushBatch(batch);
  }
}

async function main() {
  const networks = await Answer.find({ status: PostStatus.Reserved }).distinct("network");

  while (true) {
    try {
      for (const network of networks) {
        await startSubmitAnswers(network);
      }
      console.log(`Last submit at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
