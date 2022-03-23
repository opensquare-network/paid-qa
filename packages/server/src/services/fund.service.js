const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Fund } = require("../models");
const { RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const BigNumber = require("bignumber.js");
const { bnAdd } = require("../utils/bn");

async function addFund(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, transfer, signer, blockTime } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is FUND instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof FundInteraction)) {
    throw new HttpError(500, "System remark is not FUND instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  // Get reward currency type and amount from system remark
  const {
    tokenIdentifier,
    to: { id: beneficiary },
    value,
  } = transfer;

  let symbol, decimals, rewardCurrencyType;
  if (tokenIdentifier === "N") {
    rewardCurrencyType = RewardCurrencyType.Native;
    ({ symbol, decimals } = await getNativeTokenInfo(api));
  } else {
    rewardCurrencyType = RewardCurrencyType.Asset;
    ({ symbol, decimals } = await getAssetTokenInfo(
      api,
      tokenIdentifier,
      blockHash
    ));
  }

  const tokenAmount = new BigNumber(value)
    .div(Math.pow(10, decimals))
    .toFixed();

  await Fund.create({
    blockTime,
    ipfsCid: interaction.ipfsCid,
    network,
    sponsor: signer,
    beneficiary,
    currencyType: rewardCurrencyType,
    value: tokenAmount,
    ...(rewardCurrencyType === RewardCurrencyType.Asset
      ? { assetId: tokenIdentifier }
      : {}),
    symbol,
    decimals,
  });

  return {
    beneficiary,
    symbol,
    decimals,
    value: tokenAmount,
  };
}

function accumulateSymbolFunds(stats, fund) {
  const { symbol, value } = fund;
  stats[symbol] = bnAdd(stats[symbol] || 0, value);
}

function accumulateSponsorFunds(stats, fund) {
  stats[fund.sponsor] = stats[fund.sponsor] || {};
  accumulateSymbolFunds(stats[fund.sponsor], fund);
}

function sumUpFunds(funds) {
  const result = {};
  funds?.forEach((fund) => {
    accumulateSymbolFunds(result, fund);
  });
  return result;
}

async function getFundSummary(topicCid) {
  const topic = await Topic.findOne({ cid: topicCid })
    .populate("funds")
    .populate({
      path: "answers",
      options: { sort: { createdAt: 1 } },
      populate: "funds",
    });

  const statsByAnswers = {};
  if (topic.funds?.length > 0) {
    statsByAnswers[0] = sumUpFunds(topic.funds);
  }
  topic.answers.forEach((answer, index) => {
    if (answer.funds?.length > 0) {
      statsByAnswers[index + 1] = sumUpFunds(answer.funds);
    }
  });

  const statsBySponsors = {};
  topic.funds?.forEach((fund) => accumulateSponsorFunds(statsBySponsors, fund));
  topic.answers?.forEach((answer) => {
    answer.funds?.forEach((fund) =>
      accumulateSponsorFunds(statsBySponsors, fund)
    );
  });

  return {
    statsByAnswers,
    statsBySponsors,
  };
}

module.exports = {
  addFund,
  getFundSummary,
};
