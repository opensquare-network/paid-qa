const {
  parser: { InteractionParser },
  interactions: { ResolveInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const { Topic, Resolve } = require("../../models");
const { getApi, getRemark } = require("../node.service");
const updateTopicResolve = require("./updateTopicResolve");

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
    indexer: {
      blockHash,
      blockHeight,
      extrinsicIndex,
      blockTime,
    },
    topicCid,
    network,
    sponsor: signer,
  });

  await updateTopicResolve(topicCid);

  return {
    topicCid,
  };
}

module.exports = resolve;
