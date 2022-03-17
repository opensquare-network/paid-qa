const BigNumber = require("bignumber.js");
const { HttpError } = require("../utils/exc");

async function validateTokenAmount(tokenAmount, decimals) {
  if (!tokenAmount.match(/^[\.\d]+$/)) {
    throw new HttpError(500, "Invalid reward value");
  }
  const amount = new BigNumber(tokenAmount);
  if (amount.isNaN() || amount.lte(0)) {
    throw new HttpError(500, "Invalid reward value");
  }
  if ((tokenAmount.split(".")[1]?.length || 0) > decimals) {
    throw new HttpError(500, "Invalid reward value");
  }
}

module.exports = {
  validateTokenAmount,
};
