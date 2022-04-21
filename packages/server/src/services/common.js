const BigNumber = require("bignumber.js");
const { HttpError } = require("../utils/exc");

function validateTokenAmount(tokenAmount, decimals) {
  const errMsg = "Invalid reward value";

  if (!tokenAmount.match(/^[\.\d]+$/)) {
    throw new HttpError(500, errMsg);
  }
  const amount = new BigNumber(tokenAmount);
  if (amount.isNaN() || amount.lte(0)) {
    throw new HttpError(500, errMsg);
  }
  if ((tokenAmount.split(".")[1]?.length || 0) > decimals) {
    throw new HttpError(500, errMsg);
  }
}

module.exports = {
  validateTokenAmount,
};
