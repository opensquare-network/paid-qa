const {
  parser: { InteractionParser },
  interactions: { ResolveInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Resolve } = require("../models");
const { getApi, getRemark } = require("./node.service");

async function resolve(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  console.log(remark);
  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof ResolveInteraction)) {
    throw new HttpError(500, "System remark is not RESOLVE instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  console.log(interaction.topicIpfsCid);
  // Find the related topic
  const topic = await Topic.findOne({ cid: interaction.topicIpfsCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  await Resolve.create({
    blockTime,
    topicCid: interaction.topicIpfsCid,
    network,
    sponsor: signer,
  });

  return {
    topicCid: interaction.topicIpfsCid,
  };
}

module.exports = {
  resolve,
};
