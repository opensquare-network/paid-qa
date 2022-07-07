const dotenv = require("dotenv");
dotenv.config();

const {
  encoder: { InteractionEncoder },
  interactions: { AnswerInteraction },
} = require("@paid-qa/spec");
const { Answer } = require("@paid-qa/backend-common/src/models");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { getApi, submitRemarks } = require("../services/node.service");

const BATCH_SIZE = 1000;
const batches = {};

async function flushBatch(network) {
  const batch = batches[network];
  if (batch.length === 0) {
    return;
  }

  const api = getApi(network);
  const result = await submitRemarks(
    api,
    batch.map((i) => i.remark)
  );

  if (result.status === "success") {
    await Answer.updateMany(
      {
        cid: {
          $in: batch.map((i) => i.answerCid),
        },
      },
      { status: OnChainStatus.Published }
    );
  }
}

async function batchSend(network, answerCid, remark) {
  const batch = batches[network];

  batch.push({ answerCid, remark });
  if (batch.length >= BATCH_SIZE) {
    await flushBatch(network);
  }
}

async function submitAnswer(network, answer) {
  const interaction = new AnswerInteraction(answer.cid);
  const remark = new InteractionEncoder(interaction).getRemark();

  await batchSend(network, answer.cid, remark);
}

async function startSubmitAnswers(network) {
  batches[network] = [];

  const answers = await Answer.find({
    status: OnChainStatus.Reserved,
    network,
  }).limit(1000);

  for (const answer of answers) {
    try {
      await submitAnswer(network, answer);
    } catch (e) {
      console.error(e);
    }
  }

  // Force to do batch submit for the rest
  await flushBatch(network);
}

async function main() {
  const networks = await Answer.find({
    status: OnChainStatus.Reserved,
  }).distinct("network");

  try {
    for (const network of networks) {
      await startSubmitAnswers(network);
    }
    console.log(`Last submit at:`, new Date());
  } catch (e) {
    console.error(e);
  }
}

main().finally(() => process.exit());
