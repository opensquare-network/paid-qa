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

const MAX_BATCH_SIZE = 1000;

async function submitAnswers(network, answers = []) {
  if (answers.length <= 0) {
    return;
  }

  let cids = [];
  let remarks = [];
  for (const answer of answers) {
    const interaction = new AnswerInteraction(answer.cid);
    const remark = new InteractionEncoder(interaction).getRemark();
    cids.push(answer.cid);
    remarks.push(remark);
  }

  const api = getApi(network);
  const result = await submitRemarks(api, remarks);

  if (result.status === "success") {
    await Answer.updateMany(
      {
        cid: { $in: cids },
      },
      { status: OnChainStatus.Published }
    );
  }
}

async function startSubmitAnswers(network) {
  const answers = await Answer.find({
    status: OnChainStatus.Reserved,
    network,
  }).limit(MAX_BATCH_SIZE);

  await submitAnswers(network, answers);
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
