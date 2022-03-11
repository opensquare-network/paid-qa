import BigNumber from "bignumber.js";

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

export function getSymbolByChain(chainName) {
  switch (chainName) {
    case "polkadot":
      return "DOT";
    case "kusama":
      return "KSM";
    case "karura":
      return "KAR";
    case "acala":
      return "ACA";
    case "khala":
      return "PHA";
    case "basilisk":
      return "BSX";
    case "bifrost":
      return "BFC";
    case "kintsugi":
      return "KINT";
    case "westend":
      return "WND";
    default:
      return "unknown";
  }
}

export function getDecimalByChain(chainName) {
  switch (chainName) {
    case "polkadot":
      return 10;
    case "kusama":
      return 12;
    case "karura":
    case "acala":
    case "khala":
    case "basilisk":
    case "bifrost":
    case "kintsugi":
    case "westend":
      return 12;
    default:
      return 12;
  }
}
