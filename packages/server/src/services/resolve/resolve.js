const {
  parser: { InteractionParser },
  interactions: { ResolveInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const { Topic, Resolve } = require("@paid-qa/backend-common/src/models");
const { getApi, getRemark } = require("../node.service");
const updateTopicResolve = require("./updateTopicResolve");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function resolve(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );
  const signerPublicKey = toPublicKey(signer);

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

  await Resolve.updateOne(
    {
      topicCid,
      sponsorPublicKey: signerPublicKey,
    },
    {
      indexer: {
        blockHash,
        blockHeight,
        extrinsicIndex,
        blockTime,
      },
      network,
      sponsor: signer,
    },
    {
      upsert: true,
    }
  );

  await updateTopicResolve(topicCid);

  return {
    topicCid,
  };
}

module.exports = resolve;
