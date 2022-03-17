const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Answer, Fund } = require("../models");
const { RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const { validateTokenAmount } = require("./common");

async function fundTopic(topicCid, network, blockHash, extrinsicIndex) {
  // Find the related topic
  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, transfer, signer, blockTime } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof FundInteraction)) {
    throw new HttpError(500, "System remark is not SUPPORT instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  if (interaction.ipfsCid !== topicCid) {
    throw new HttpError(500, "Topic cid is not match");
  }

  await Fund.create({
    blockTime,
    ipfsCid: topicCid,
    network,
    sponsor: signer,
    currencyType: rewardCurrencyType,
    value: tokenAmount,
    ...(rewardCurrencyType === RewardCurrencyType.Asset
      ? { assetId: tokenIdentifier }
      : {}),
    symbol,
    decimals,
  });

  return {
    symbol,
    decimals,
    value: tokenAmount,
  };
}

async function fundAnswer(
  topicCid,
  answerCid,
  network,
  blockHash,
  extrinsicIndex
) {
  return true;
}

module.exports = {
  fundTopic,
  fundAnswer,
};
