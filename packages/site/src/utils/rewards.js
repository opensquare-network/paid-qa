import { bnAdd } from "@osn/common/src/utils/tokenValue";

export function calcRewards(rewards) {
  //TODO: handle different asset with same symbol name
  const tokenValues = {};
  rewards?.forEach((reward) => {
    tokenValues[reward.bounty.symbol] = bnAdd(
      tokenValues[reward.bounty.symbol] ?? "0",
      reward.bounty.value
    );
  });
  return tokenValues;
}

export function calcSponserRewards(rewards) {
  //TODO: handle different asset with same symbol name
  const tokenValues = {};
  rewards?.forEach((reward) => {
    const key = `${reward.network}:${reward.sponsor}:${reward.bounty.symbol}`;
    tokenValues[key] = bnAdd(tokenValues[key] ?? "0", reward.bounty.value);
  });
  return Object.keys(tokenValues).map((key) => {
    const [network, sponsor, symbol] = key.split(":");
    const value = tokenValues[key];
    return { network, sponsor, symbol, value };
  });
}
