const mongoose = require("mongoose");
const { Topic, Reward, Appendant } = require("../models");
const { PostStatus, RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const {
  parser: { InteractionParser },
  interactions: { NewInteraction, AppendInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { ipfsAdd, cidOf } = require("./ipfs.service");
const { validateTokenAmount } = require("./common");
const { toPublicKey } = require("../utils/address");
const { escapeRegex } = require("../utils/regex");

async function createTopic(data, network, blockHash, extrinsicIndex) {
  const { title, content, language } = data;

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime } = await getRemark(
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

  // Validate reward value
  validateTokenAmount(tokenAmount, decimals);

  const signerPublicKey = toPublicKey(signer);

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await Topic.create(
      [
        {
          blockTime,
          cid,
          title,
          content,
          language,
          data,
          pinned: false,
          network,
          signer,
          signerPublicKey,
          status: PostStatus.Published,
        },
      ],
      { session }
    );

    await Reward.create(
      [
        {
          blockTime,
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
          sponsorPublicKey: signerPublicKey,
        },
      ],
      { session }
    );
  });

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

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid })
    .populate("rewards")
    .populate("appendants")
    .populate("funds")
    .populate("resolves");
  return topic;
}

async function getTopics(symbol, status, title, page, pageSize) {
  const q = {};
  if (status && status !== "all") {
    q.status = status;
  } else {
    q.status = {
      $in: [PostStatus.Published, PostStatus.Active, PostStatus.Resolved],
    };
  }

  if (title && title !== "") {
    q.title = new RegExp(escapeRegex(title), "i");
  }

  if (symbol && symbol !== "all") {
    const [{ items: topics, total: [{ count: total } = {}] = [] } = {}] =
      await Topic.aggregate([
        { $match: q },
        {
          $lookup: {
            from: "rewards",
            let: { topicCid: "$cid" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$topicCid", "$$topicCid"],
                  },
                },
              },
              {
                $addFields: {
                  value: { $toString: "$value" },
                },
              },
            ],
            as: "rewards",
          },
        },
        {
          $match: {
            "rewards.symbol": symbol,
          },
        },
        {
          $facet: {
            total: [
              {
                $count: "count",
              },
            ],
            items: [
              { $sort: { blockTime: -1 } },
              { $skip: (page - 1) * pageSize },
              { $limit: pageSize },
              {
                $lookup: {
                  from: "answers",
                  let: { topicCid: "$cid" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$topicCid", "$$topicCid"],
                        },
                      },
                    },
                    {
                      $count: "count",
                    },
                  ],
                  as: "answersCount",
                },
              },
              {
                $addFields: {
                  answersCount: {
                    $arrayElemAt: ["$answersCount.count", 0],
                  },
                },
              },
            ],
          },
        },
      ]);

    return {
      items: topics,
      page,
      pageSize,
      total,
    };
  } else {
    const total = await Topic.countDocuments(q);
    const topics = await Topic.find(q)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("answersCount")
      .populate("rewards");

    return {
      items: topics,
      page,
      pageSize,
      total,
    };
  }
}

async function addAppendant(data, network, blockHash, extrinsicIndex) {
  const { topic, content } = data;

  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, signer, blockTime } = await getRemark(
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
    blockTime,
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

module.exports = {
  createTopic,
  getTopic,
  getTopics,
  addAppendant,
};
