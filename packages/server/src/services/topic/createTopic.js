const mongoose = require("mongoose");
const {
  connection,
  Topic,
  Reward,
} = require("@paid-qa/backend-common/src/models");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("../node.service");
const {
  parser: { InteractionParser },
  interactions: { NewInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const { ipfsAdd, cidOf } = require("../ipfs.service");
const { validateTokenAmount } = require("../common");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  updatePromiseFulfillment,
} = require("@paid-qa/backend-common/src/services/fulfill");
const { logger } = require("../logger");

async function createVerifiedTopic(data, network, blockHash, extrinsicIndex) {
  const { title, content } = data;

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof NewInteraction)) {
    throw new HttpError(500, "System remark is not NEW instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  const cid = await cidOf(data);

  // Verify if ipfs cid is the same as the one in the system remark
  if (interaction.topicIpfsCid !== cid) {
    console.log(cid);
    throw new HttpError(
      500,
      "System remark topic cid does not match the ipfs content"
    );
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

  const signerPublicKey = toPublicKey(signer);

  const session = await connection.startSession();
  await session.withTransaction(async () => {
    await Topic.updateOne(
      { cid },
      {
        indexer: {
          blockHash,
          blockHeight,
          extrinsicIndex,
          blockTime,
        },
        title,
        content,
        bounty: {
          value: tokenAmount,
          tokenIdentifier,
          symbol,
          decimals,
        },
        data,
        pinned: false,
        network,
        signer,
        signerPublicKey,
        status: OnChainStatus.Published,
      },
      { upsert: true, session }
    );

    await Reward.updateOne(
      {
        "indexer.blockHash": blockHash,
        "indexer.extrinsicIndex": extrinsicIndex,
      },
      {
        "indexer.blockHeight": blockHeight,
        "indexer.blockTime": blockTime,
        topicCid: cid,
        network,
        bounty: {
          value: tokenAmount,
          tokenIdentifier,
          symbol,
          decimals,
        },
        type: "topic",
        sponsor: signer,
        sponsorPublicKey: signerPublicKey,
      },
      { upsert: true, session }
    );
  });

  await updatePromiseFulfillment(cid, signerPublicKey);

  // Upload topic content to IPFS
  try {
    const added = await ipfsAdd(data);
    const pinnedCid = added?.cid?.toV1().toString();
    if (pinnedCid !== cid) {
      console.error("Pinned path does not match the topic content CID");
      return;
    }
    await Topic.updateOne({ cid }, { pinned: true });
  } catch (err) {
    console.error(err);
  }

  return {
    cid,
  };
}

async function saveUnverifiedTopic(
  data,
  network,
  blockHash,
  extrinsicIndex,
  blockHeight,
  blockTime,
  bounty,
  signer
) {
  const { title, content } = data;

  const signerPublicKey = toPublicKey(signer);
  const cid = await cidOf(data);

  const session = await connection.startSession();
  await session.withTransaction(async () => {
    await Topic.updateOne(
      { cid },
      {
        indexer: {
          blockHash,
          blockHeight,
          extrinsicIndex,
          blockTime,
        },
        title,
        content,
        data,
        pinned: false,
        network,
        signer,
        signerPublicKey,
        status: OnChainStatus.Reserved,
      },
      { upsert: true, session }
    );

    await Reward.updateOne(
      {
        "indexer.blockHash": blockHash,
        "indexer.extrinsicIndex": extrinsicIndex,
      },
      {
        "indexer.blockHeight": blockHeight,
        "indexer.blockTime": blockTime,
        topicCid: cid,
        network,
        bounty,
        sponsor: signer,
        sponsorPublicKey: signerPublicKey,
        status: OnChainStatus.Reserved,
      },
      { upsert: true, session }
    );
  });

  await updatePromiseFulfillment(cid, signerPublicKey);

  return {
    cid,
  };
}

async function createTopic(
  data,
  network,
  blockHash,
  extrinsicIndex,
  blockHeight,
  blockTime,
  bounty,
  signer
) {
  try {
    return await createVerifiedTopic(data, network, blockHash, extrinsicIndex);
  } catch (e) {
    logger.error(`Cannot verify topic: ${e.message}`);
    return await saveUnverifiedTopic(
      data,
      network,
      blockHash,
      extrinsicIndex,
      blockHeight,
      blockTime,
      bounty,
      signer
    );
  }
}

module.exports = createTopic;
