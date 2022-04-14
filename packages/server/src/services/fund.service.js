const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Fund, Notification, Answer } = require("../models");
const { RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const BigNumber = require("bignumber.js");
const { bnAdd } = require("../utils/bn");
const { toPublicKey } = require("../utils/address");

async function addFund(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, transfer, signer, blockTime, blockHeight } = await getRemark(
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

  if (beneficiary === signer) {
    throw new HttpError(500, "Not allow to fund self");
  }

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

  const sponsorPublicKey = toPublicKey(signer);
  const beneficiaryPublicKey = toPublicKey(beneficiary);

  const fundObj = await Fund.create({
    blockHash,
    blockHeight,
    extrinsicIndex,
    blockTime,
    ipfsCid: interaction.ipfsCid,
    network,
    sponsor: signer,
    sponsorPublicKey,
    beneficiary,
    beneficiaryPublicKey,
    currencyType: rewardCurrencyType,
    value: tokenAmount,
    ...(rewardCurrencyType === RewardCurrencyType.Asset
      ? { assetId: tokenIdentifier }
      : {}),
    symbol,
    decimals,
  });

  let topic = await Topic.findOne({ cid: interaction.ipfsCid });
  let answer = await Answer.findOne({ cid: interaction.ipfsCid });
  const fundTo = topic?.signer || answer?.signer;
  if (answer) {
    topic = await Topic.findOne({ cid: answer.topicCid });
  }

  const owner = toPublicKey(fundTo);
  await Notification.create({
    owner,
    type: ["fund"],
    data: {
      topic: topic?._id,
      answer: answer?._id,
      fund: fundObj._id,
      byWho: {
        address: signer,
        network,
      },
    },
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
