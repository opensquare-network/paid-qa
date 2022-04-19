import { bnAdd } from "@osn/common/src/utils/tokenValue";

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
    const key = `${reward.network}:${reward.sponsor}:${reward.symbol}`;
    tokenValues[key] = bnAdd(tokenValues[key] ?? "0", reward.value);
  });
  return Object.keys(tokenValues).map((key) => {
    const network = key.split(":")[0];
    const sponsor = key.split(":")[1];
    const symbol = key.substring(network.length + sponsor.length + 2);
    const value = tokenValues[key];
    return { network, sponsor, symbol, value };
  });
}
