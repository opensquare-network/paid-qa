const { Topic, Appendant } = require("../../models");
const { PostStatus } = require("../../utils/constants");
const {
  getApi,
  getRemark,
} = require("../node.service");
const {
  parser: { InteractionParser },
  interactions: { AppendInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const { ipfsAdd, cidOf } = require("../ipfs.service");

async function addAppendant(data, network, blockHash, extrinsicIndex) {
  const { topic, content } = data;

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is APPEND instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof AppendInteraction)) {
    throw new HttpError(500, "System remark is not APPEND instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  if (interaction.topicIpfsCid !== topic) {
    throw new HttpError(
      500,
      "System remark topic cid does not match the append content"
    );
  }

  const cid = await cidOf(data);

  // Verfify if ipfs cid is the same as the one in the system remark
  if (interaction.messageIpfsCid !== cid) {
    throw new HttpError(
      500,
      "System remark append message cid does not match the ipfs content"
    );
  }

  // Find the related topic
  const appendToTopic = await Topic.findOne({ cid: interaction.topicIpfsCid });
  if (!appendToTopic) {
    throw new HttpError(500, "Topic does not exist");
  }

  // Only topic owner can append content to topic
  if (appendToTopic.signer !== signer) {
    throw new HttpError(500, "You are not the topic owner");
  }

  // Limit the appendants creation to the same network with the parent topic
  if (appendToTopic.network !== network) {
    throw new HttpError(500, "Appendant does not match the topic network");
  }

  await Appendant.create({
    indexer: {
      blockHash,
      blockHeight,
      extrinsicIndex,
      blockTime,
    },
    topicCid: interaction.topicIpfsCid,
    cid,
    content,
    data,
    pinned: false,
    network,
    signer,
    status: PostStatus.Published,
  });

  // Upload topic content to IPFS
  try {
    const added = await ipfsAdd(data);
    const pinnedCid = added?.cid?.toV1().toString();
    if (pinnedCid !== cid) {
      console.error("Pinned path does not match the appendant content CID");
      return;
    }
    await Appendant.updateOne({ cid }, { pinned: true });
  } catch (err) {
    console.error(err);
  }

  return {
    cid,
  };
}

module.exports = addAppendant;
