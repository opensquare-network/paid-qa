import BigNumber from "bignumber.js";
import { ChainSymbols } from "@osn/constants";

export function bnAdd(a, b) {
  return new BigNumber(a).plus(b).toString();
}

export function toPrecision(value, decimals) {
  return new BigNumber(value).dividedBy(Math.pow(10, decimals)).toString();
}

export function abbreviateBigNumber(x, fixed = 2) {
  const n = new BigNumber(x);
  const fmt = {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
  };
  let divideBy = new BigNumber("1");
  const bigNumbers = [
    { bigNumber: new BigNumber("1000"), abbr: "K" },
    { bigNumber: new BigNumber("1000000"), abbr: "M" },
    { bigNumber: new BigNumber("1000000000"), abbr: "B" },
    { bigNumber: new BigNumber("1000000000000"), abbr: "T" },
    { bigNumber: new BigNumber("1000000000000000"), abbr: "Q" },
  ];
  bigNumbers.forEach((data) => {
    if (n.isGreaterThan(data.bigNumber)) {
      divideBy = data.bigNumber;
      fmt.suffix = data.abbr;
    }
  });
  BigNumber.config({ FORMAT: fmt });
  return new BigNumber(n.dividedBy(divideBy).toFixed(fixed)).toFormat();
}

export function getEffectiveNumbers(n) {
  const result = [];
  let flag = false;
  n.toString()
    .split("")
    .reverse()
    .forEach((dig) => {
      if (!isNaN(parseInt(dig))) {
        flag = flag || parseInt(dig) > 0;
        flag && result.push(dig);
      }
    });
  return result.reverse().join();
}

export function getSymbolMetaByChain(chainName) {
  return (
    ChainSymbols[chainName] || {
      symbol: "unknown",
      decimals: 12,
    }
  );
}

export function getSymbolByChain(chainName) {
  return getSymbolMetaByChain(chainName).symbol;
}

export function getDecimalByChain(chainName) {
  return getSymbolMetaByChain(chainName).decimals;
}
