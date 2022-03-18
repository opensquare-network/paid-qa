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
let batch = [];

async function flushBatch(api) {
  const copiedBatch = [...batch];
  batch = [];
  if (copiedBatch.length === 0) {
    return;
  }

  const result = await submitRemarks(
    api,
    copiedBatch.map((i) => i.remark)
  );

  if (result.status === "success") {
    await Answer.updateMany(
      {
        cid: {
          $in: copiedBatch.map((i) => i.answerCid),
        },
      },
      { status: PostStatus.Published }
    );
  }
}

async function batchSend(api, answerCid, remark) {
  batch.push({ answerCid, remark });
  if (batch.length >= BATCH_SIZE) {
    await flushBatch(api);
  }
}

async function submitAnswer(api, answer) {
  const interaction = new AnswerInteraction(answer.cid);
  const remark = new InteractionEncoder(interaction).getRemark();

  await batchSend(api, answer.cid, remark);
}

async function startSubmitAnswers(api) {
  batch = [];
  const answers = await Answer.find({ status: PostStatus.Reserved });
  for (const answer of answers) {
    try {
      await submitAnswer(api, answer);
    } catch (e) {
      console.error(e);
    }
  }
  await flushBatch(api);
}

async function main() {
  //TODO: update westend to real network in production
  const api = await getApi("westend");

  while (true) {
    try {
      await startSubmitAnswers(api);
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
