const mongoose = require("mongoose");
const Hash = require("ipfs-only-hash");
const { Topic, Reward } = require("../models");
const { PostStatus, RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const {
  parser: { InteractionParser },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");

async function createTopic(
  title,
  content,
  language,
  data,
  network,
  blockHash,
  extrinsicHash
) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);

  // Get system remark from network/blockHash/extrinsicHash
  const api = await getApi(network);
  const { remark, signer } = await getRemark(api, blockHash, extrinsicHash);

  // Parse system remark to verify if it is NEW instruction
  const interaction = InteractionParser.parse(remark);
  if (interaction.symbol !== "N") {
    throw new HttpError(500, "System remark is not NEW instruction");
  }

  // Verfify if ipfs cid is the same as the one in the system remark
  if (interaction.topicIpfsCid !== cid) {
    throw new HttpError(
      500,
      "System remark topic cid does not match the ipfs content"
    );
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

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await Topic.create(
      [
        {
          cid,
          title,
          content,
          language,
          network,
          signer,
          status: PostStatus.Published,
        },
      ],
      { session }
    );

    await Reward.create(
      [
        {
          topicCid: cid,
          network,
          rewardCurrencyType,
          value: tokenAmount,
          ...(rewardCurrencyType === RewardCurrencyType.Asset
            ? { assetId: tokenIdentifier }
            : {}),
          symbol,
          decimals,
          sponsor: signer,
        },
      ],
      { session }
    );
  });

  return {
    cid,
  };
}

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid }).populate("rewards");
  return topic;
}

async function getTopics(page, pageSize) {
  const topics = await Topic.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("rewards");
  return topics;
}

module.exports = {
  createTopic,
  getTopic,
  getTopics,
};
