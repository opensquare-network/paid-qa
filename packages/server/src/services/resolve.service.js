const {
  parser: { InteractionParser },
  interactions: { ResolveInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Resolve, Reward, Notification } = require("../models");
const { getApi, getRemark } = require("./node.service");
const { isSamePublicKey, toPublicKey } = require("../utils/address");
const { PostStatus } = require("../utils/constants");
const uniq = require("lodash.uniq");

async function resolve(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is RESOLVE instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof ResolveInteraction)) {
    throw new HttpError(500, "System remark is not RESOLVE instruction");
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

  await Resolve.create({
    blockHash,
    blockHeight,
    extrinsicIndex,
    blockTime,
    topicCid,
    network,
    sponsor: signer,
  });

  await updateTopicResolve(topicCid);

  return {
    topicCid,
  };
}

async function updateTopicResolve(topicCid) {
  const rewards = await Reward.find({ topicCid });
  const resolves = await Resolve.find({ topicCid });

  const allResolved = !rewards.some(
    (reward) =>
      !resolves.some((resolve) =>
        isSamePublicKey(reward.sponsor, resolve.sponsor)
      )
  );

  await Topic.updateOne(
    { cid: topicCid },
    { status: allResolved ? PostStatus.Resolved : PostStatus.Active }
  );

  if (allResolved) {
    const topic = await Topic.findOne({ cid: topicCid }).populate("rewards");
    const sponsors = uniq(
      topic?.rewards?.map((reward) => toPublicKey(reward.sponsor)) || []
    );

    // Create notification for all sponsors when topic is resolved
    if (sponsors.length > 0) {
      await Notification.create(
        sponsors.map((sponsor) => ({
          owner: sponsor,
          type: ["topicResolved"],
          data: {
            topic: topic._id,
          },
        }))
      );
    }
  }
}

module.exports = {
  resolve,
  updateTopicResolve,
};
