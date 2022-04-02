const { Topic, Reward, Fund, Answer } = require("../../models");
const { toPublicKey } = require("../../utils/address");
const { extractPage } = require("../../utils/pagination");

async function getAccountTopics(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const signerPublicKey = toPublicKey(address);
  const q = { signerPublicKey };
  const total = await Topic.countDocuments(q);
  const topics = await Topic.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("answersCount")
    .populate("rewards");

  ctx.body = {
    items: topics,
    page,
    pageSize,
    total,
  };
}

async function getAccountPromisedTopics(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const signerPublicKey = toPublicKey(address);
  const q = { sponsorPublicKey: signerPublicKey };
  const total = await Reward.countDocuments(q);
  const promises = await Reward.aggregate([
    { $match: { sponsorPublicKey: signerPublicKey } },
    {
      $lookup: {
        from: "topics",
        localField: "topicCid",
        foreignField: "cid",
        as: "topic",
      },
    },
    {
      $project: {
        topic: { $arrayElemAt: ["$topic", 0] },
      },
    },
  ]);

  ctx.body = {
    items: promises,
    page,
    pageSize,
    total,
  };
}

async function getAccountFunds(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const signerPublicKey = toPublicKey(address);
  const q = { signerPublicKey };
  const total = await Fund.countDocuments(q);
  const topics = await Fund.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  ctx.body = {
    items: topics,
    page,
    pageSize,
    total,
  };
}

async function getAccountPromises(ctx) {
  const { address } = ctx.params;

  const sponsorPublicKey = toPublicKey(address);
  const q = { sponsorPublicKey };
  const rewards = await Reward.aggregate([
    { $match: q },
    {
      $group: {
        _id: "$symbol",
        value: { $sum: "$value" },
      },
    },
  ]);

  const funds = await Fund.aggregate([
    { $match: q },
    {
      $group: {
        _id: "$symbol",
        value: { $sum: "$value" },
      },
    },
  ]);

  const result = {};
  rewards.forEach((reward) => {
    result[reward._id] = { promise: reward.value.toString() };
  });
  funds.forEach((fund) => {
    if (result[fund._id]) {
      result[fund._id].fund = fund.value.toString();
    }
  });

  ctx.body = result;
}

async function getAccountRewards(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const beneficiaryPublicKey = toPublicKey(address);
  const q = { beneficiaryPublicKey };
  const total = await Fund.countDocuments(q);
  const topics = await Fund.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  ctx.body = {
    items: topics,
    page,
    pageSize,
    total,
  };
}

async function getAccountAnswers(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const signerPublicKey = toPublicKey(address);
  const q = { signerPublicKey };
  const total = await Answer.countDocuments(q);
  const topics = await Answer.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("topic");

  ctx.body = {
    items: topics,
    page,
    pageSize,
    total,
  };
}

async function getAccountOverview(ctx) {
  const { address } = ctx.params;
  const signerPublicKey = toPublicKey(address);
  const q = { signerPublicKey };
  const [answersCount, fundsCount, topicsCount, rewardsCount] =
    await Promise.all([
      Answer.countDocuments(q),
      Fund.countDocuments(q),
      Topic.countDocuments(q),
      Reward.countDocuments({ sponsorPublicKey: signerPublicKey }),
    ]);

  ctx.body = {
    promisesCount: rewardsCount,
    fundsCount,
    topicsCount,
    answersCount,
  };
}

module.exports = {
  getAccountTopics,
  getAccountPromisedTopics,
  getAccountPromises,
  getAccountFunds,
  getAccountRewards,
  getAccountAnswers,
  getAccountOverview,
};
