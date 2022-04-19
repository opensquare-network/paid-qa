import {
  abbreviateBigNumber,
  bnAdd,
  getDecimalByChain,
  getEffectiveNumbers,
  getSymbolByChain,
  toPrecision,
} from "../lib/utils/tokenValue";

test("bnAdd", () => {
  expect(bnAdd("1.2345689", "987654321")).toBe("987654322.2345689");
});

test("toPrecision", () => {
  expect(toPrecision("123456789", 12)).toBe("0.000123456789");
});

test("abbreviateBigNumber", () => {
  expect(abbreviateBigNumber("123456789", 2)).toBe("123.46M");
  expect(abbreviateBigNumber("123450789", 2)).toBe("123.45M");
});

test("getEffectiveNumbers", () => {
  expect(getEffectiveNumbers("123000000")).toBe("1,2,3");
  expect(getEffectiveNumbers("1.23000456")).toBe("1,2,3,0,0,0,4,5,6");
});

test("getSymbolByChain", () => {
  expect(getSymbolByChain("polkadot")).toBe("DOT");
  expect(getSymbolByChain("noChain")).toBe("unknown");
});

test("getDecimalByChain", () => {
  expect(getDecimalByChain("polkadot")).toBe(10);
  expect(getDecimalByChain("noChain")).toBe(12);
});
