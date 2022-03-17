import { bnAdd } from "@osn/common-ui/lib/utils/tokenValue";

export function calcRewards(rewards) {
  //TODO: handle different asset with same symbol name
  const tokenValues = {};
  rewards?.forEach((reward) => {
    tokenValues[reward.symbol] = bnAdd(
      tokenValues[reward.symbol] ?? "0",
      reward.value
    );
  });
  return tokenValues;
}

export function calcSponserRewards(rewards) {
  //TODO: handle different asset with same symbol name
  const tokenValues = {};
  rewards?.forEach((reward) => {
    const key = `${reward.sponsor}:${reward.symbol}`;
    tokenValues[key] = bnAdd(tokenValues[key] ?? "0", reward.value);
  });
  return Object.keys(tokenValues).map((key) => {
    const sponsor = key.split(":")[0];
    const symbol = key.substring(sponsor.length + 1);
    const value = tokenValues[key];
    return { sponsor, symbol, value };
  });
}
