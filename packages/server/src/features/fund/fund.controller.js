const fundService = require("../../services/fund.service");
const { HttpError } = require("../../utils/exc");

async function fundTopic(ctx) {
  const { topicCid } = ctx.params;
  const { network, blockHash, extrinsicIndex } = ctx.request.body;

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!blockHash) {
    throw new HttpError(400, { network: ["Block hash is missing"] });
  }

  if (extrinsicIndex === undefined) {
    throw new HttpError(400, { network: ["Extrinsic index is missing"] });
  }

  ctx.body = await fundService.fundTopic(
    topicCid,
    network,
    blockHash,
    extrinsicIndex
  );
}

async function fundAnswer(ctx) {
  const { topicCid, answerCid } = ctx.params;
  const { network, blockHash, extrinsicIndex } = ctx.request.body;

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!blockHash) {
    throw new HttpError(400, { network: ["Block hash is missing"] });
  }

  if (extrinsicIndex === undefined) {
    throw new HttpError(400, { network: ["Extrinsic index is missing"] });
  }

  ctx.body = await fundService.fundAnswer(
    topicCid,
    answerCid,
    network,
    blockHash,
    extrinsicIndex
  );
}

module.exports = {
  fundTopic,
  fundAnswer,
};
