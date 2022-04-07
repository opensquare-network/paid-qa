import { calcRewards, calcSponserRewards } from "./rewards";
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

test("calcSponserRewards", () => {
  const rewards = [
    {
      network: "westend",
      symbol: "WND",
      value: "0.03",
      sponsor: "5Cfs4BRTE6rzK3qT3Vcr2otLXhnpw58Mh2aZSitT1vWtHkjh",
    },
    {
      network: "westend",
      symbol: "WND",
      value: "0.11",
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
    },
    {
      network: "westend",
      symbol: "KSM",
      value: "0.12",
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
    },
    {
      network: "westend",
      symbol: "KSM",
      value: "0.5",
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
    },
  ];
  expect(calcSponserRewards(rewards)).toStrictEqual([
    {
      network: "westend",
      sponsor: "5Cfs4BRTE6rzK3qT3Vcr2otLXhnpw58Mh2aZSitT1vWtHkjh",
      symbol: "WND",
      value: "0.03",
    },
    {
      network: "westend",
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      symbol: "WND",
      value: "0.11",
    },
    {
      network: "westend",
      sponsor: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      symbol: "KSM",
      value: "0.62",
    },
  ]);
});
