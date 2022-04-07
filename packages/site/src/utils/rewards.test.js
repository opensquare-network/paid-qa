import { calcRewards } from "./rewards";
import flatten from "lodash.flatten";

test("calcRewards", () => {
  const rewards = [
    {
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      symbol: "WND",
      value: "0.25",
    },
    {
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      symbol: "KSM",
      value: "0.55",
    },
  ];
  expect(calcRewards(flatten(rewards))).toStrictEqual({
    WND: "0.25",
    KSM: "0.55",
  });
});
