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
  const [{ items: promises, total: [{ count: total = 0 } = {}] = [] } = {}] =
    await Reward.aggregate([
      { $match: { sponsorPublicKey: signerPublicKey } },
      {
        $group: {
          _id: "$topicCid",
          topicCid: { $first: "$topicCid" },
          promises: {
            $addToSet: { value: { $toString: "$value" }, symbol: "$symbol" },
          },
          symbols: { $addToSet: "$symbol" },
          blockTime: { $first: "$blockTime" },
        },
      },
      {
        $lookup: {
          from: "funds",
          let: { topicCid: "$topicCid" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$ipfsCid", "$$topicCid"] },
              },
            },
            { $project: { symbol: 1, value: 1 } },
            {
              $group: {
                _id: "$symbol",
                value: { $sum: "$value" },
              },
            },
            {
              $project: {
                value: { $toString: "$value" },
                symbol: "$_id",
              },
            },
          ],
          as: "funds",
        },
      },
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
          topicCid: 1,
          topic: { $arrayElemAt: ["$topic", 0] },
          promises: 1,
          funds: 1,
          symbols: 1,
          blockTime: 1,
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
          ],
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

  const sponsorPublicKey = toPublicKey(address);
  const q = { sponsorPublicKey };
  const total = await Fund.countDocuments(q);
  const funds = await Fund.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("topic")
    .populate({
      path: "answer",
      populate: "topic",
    });

  ctx.body = {
    items: funds,
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
  const rewards = await Fund.find(q)
    .sort({ blockTime: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("topic")
    .populate({
      path: "answer",
      populate: "topic",
    });

  ctx.body = {
    items: rewards,
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
  const promisesCountPromise = Reward.aggregate([
    { $match: { sponsorPublicKey: signerPublicKey } },
    { $group: { _id: "$topicCid" } },
    { $count: "total" },
  ]);
  const [
    [{ total: promisesCount }],
    fundsCount,
    rewardsCount,
    topicsCount,
    answersCount,
  ] = await Promise.all([
    promisesCountPromise,
    Fund.countDocuments({ sponsorPublicKey: signerPublicKey }),
    Fund.countDocuments({ beneficiaryPublicKey: signerPublicKey }),
    Topic.countDocuments(q),
    Answer.countDocuments(q),
  ]);

  ctx.body = {
    promisesCount,
    fundsCount,
    rewardsCount,
    topicsCount,
    answersCount,
  };
}

module.exports = {
  getAccountTopics,
  getAccountPromises,
  getAccountPromisedTopics,
  getAccountFunds,
  getAccountRewards,
  getAccountAnswers,
  getAccountOverview,
};
