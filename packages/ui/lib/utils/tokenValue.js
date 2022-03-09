import BigNumber from "bignumber.js";

export function bnAdd(a, b) {
  return new BigNumber(a).plus(b).toString();
}

export function toPrecision(value, decimals) {
  return new BigNumber(value).dividedBy(Math.pow(10, decimals)).toString();
}
