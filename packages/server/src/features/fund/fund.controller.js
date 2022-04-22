const fundService = require("../../services/fund");
const { HttpError } = require("../../utils/exc");

async function addFund(ctx) {
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

  ctx.body = await fundService.addFund(
    network,
    blockHash,
    extrinsicIndex
  );
}

async function getFundSummary(ctx) {
  const { topicCid } = ctx.params;

  ctx.body = await fundService.getFundSummary(topicCid);
}

module.exports = {
  addFund,
  getFundSummary,
};
