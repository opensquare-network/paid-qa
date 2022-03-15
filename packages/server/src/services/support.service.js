const {
  parser: { InteractionParser },
  interactions: { SupportInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Reward } = require("../models");
const { RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const { validateTokenAmount } = require("./common");

async function addSupport(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof SupportInteraction)) {
    throw new HttpError(500, "System remark is not SUPPORT instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  // Find the related topic
  const topic = await Topic.findOne({ cid: interaction.topicIpfsCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  // Get reward currency type and amount from system remark
  const { tokenIdentifier, tokenAmount } = interaction.toJSON();

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

  // Validate reward value
  validateTokenAmount(tokenAmount, decimals);

  await Reward.create({
    blockTime,
    topicCid: interaction.topicIpfsCid,
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

module.exports = {
  addSupport,
};
