const {
  parser: { InteractionParser },
  interactions: { ResolveInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Resolve, Reward } = require("../models");
const { getApi, getRemark } = require("./node.service");
const { isSamePublicKey } = require("../utils/address");
const { PostStatus } = require("../utils/constants");

async function resolve(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime } = await getRemark(
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
}

module.exports = {
  resolve,
  updateTopicResolve,
};
