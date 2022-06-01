const {
  parser: { InteractionParser },
  interactions: { SupportInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const {
  Topic,
  Reward,
  Notification,
} = require("@paid-qa/backend-common/src/models");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("../node.service");
const { validateTokenAmount } = require("../common");
const updateTopicResolve = require("@paid-qa/backend-common/src/services/resolve/updateTopicResolve");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  updatePromiseFulfillment,
} = require("@paid-qa/backend-common/src/services/fulfill");

async function addSupport(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is SUPPORT instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof SupportInteraction)) {
    throw new HttpError(500, "System remark is not SUPPORT instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  const topicCid = interaction.topicIpfsCid;

  // Find the related topic
  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  // Get reward currency type and amount from system remark
  const { tokenIdentifier, tokenAmount } = interaction.toJSON();

  let symbol, decimals;
  if (tokenIdentifier === "N") {
    ({ symbol, decimals } = await getNativeTokenInfo(api));
  } else {
    ({ symbol, decimals } = await getAssetTokenInfo(
      api,
      tokenIdentifier,
      blockHash
    ));
  }

  // Validate reward value
  validateTokenAmount(tokenAmount, decimals);

  const sponsorPublicKey = toPublicKey(signer);
  const support = await Reward.findOneAndUpdate(
    {
      "indexer.blockHash": blockHash,
      "indexer.extrinsicIndex": extrinsicIndex,
    },
    {
      "indexer.blockHeight": blockHeight,
      "indexer.blockTime": blockTime,
      topicCid,
      network,
      sponsor: signer,
      sponsorPublicKey,
      bounty: {
        value: tokenAmount,
        tokenIdentifier,
        symbol,
        decimals,
      },
      type: "support",
    },
    { upsert: true, new: true }
  );

  await updateTopicResolve(topicCid);

  await updatePromiseFulfillment(topicCid, sponsorPublicKey);

  const owner = toPublicKey(topic.signer);
  await Notification.create({
    owner,
    type: ["support"],
    data: {
      topic: topic._id,
      support: support._id,
      byWho: {
        address: signer,
        network,
      },
    },
  });

  return {
    topicCid,
    symbol,
    decimals,
    value: tokenAmount,
  };
}

module.exports = addSupport;
