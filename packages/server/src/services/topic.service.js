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
  interactions: {
    NewInteraction,
  }
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { ipfsAdd } = require("./ipfs.service");

async function createTopic(data, network, blockHash, extrinsicIndex) {
  const { title, content, language } = data;

  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer } = await getRemark(api, blockHash, extrinsicIndex);

  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof NewInteraction)) {
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
          data,
          pinned: false,
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
          currencyType: rewardCurrencyType,
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

  // Upload topic content to IPFS
  ipfsAdd(data)
    .then(async (added) => {
      const pinnedCid = added?.cid?.toV0().toString();
      if (pinnedCid !== cid) {
        console.error("Pinned path does not match the topic content CID");
        return;
      }
      await Topic.updateOne({ cid }, { pinned: true });
    })
    .catch(console.error);

  return {
    cid,
  };
}

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid }).populate("rewards");
  return topic;
}

async function getTopics(page, pageSize) {
  const total = await Topic.countDocuments();
  const topics = await Topic.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("rewards");

  return {
    items: topics,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  createTopic,
  getTopic,
  getTopics,
};
