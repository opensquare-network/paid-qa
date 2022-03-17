const fundService = require("../../services/fund.service");
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

module.exports = {
  addFund,
};
