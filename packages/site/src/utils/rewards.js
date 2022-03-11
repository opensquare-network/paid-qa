import { bnAdd } from "@osn/common-ui/lib/utils/tokenValue";

export function calcRewards(rewards) {
  const tokenValues = {};
  rewards?.forEach((reward) => {
    tokenValues[reward.symbol] = bnAdd(
      tokenValues[reward.symbol] ?? "0",
      reward.value
    );
  });
  return tokenValues;
}
