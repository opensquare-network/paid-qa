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
    .sort({ "indexer.blockTime": -1 })
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
          _id: {
            topicCid: "$topicCid",
            symbol: "$bounty.symbol",
          },
          value: { $sum: "$bounty.value" },
          promiseTime: { $max: "$indexer.blockTime" },
        },
      },
      {
        $group: {
          _id: "$_id.topicCid",
          promises: {
            $push: {
              value: { $toString: "$value" },
              symbol: "$_id.symbol",
            },
          },
          promiseTime: { $max: "$promiseTime" },
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "topicCid",
          as: "answers",
        },
      },
      {
        $lookup: {
          from: "funds",
          let: { topicCid: "$_id", answerCid: "$answers.cid" },
          pipeline: [
            {
              $match: {
                sponsorPublicKey: signerPublicKey,
                $expr: {
                  $or: [
                    { $eq: ["$refCid", "$$topicCid"] },
                    { $in: ["$refCid", "$$answerCid"] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: "$bounty.symbol",
                value: { $sum: "$bounty.value" },
              },
            },
            {
              $project: {
                _id: 0,
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
          localField: "_id",
          foreignField: "cid",
          as: "topic",
        },
      },
      {
        $lookup: {
          from: "resolves",
          let: { topicCid: "$_id" },
          pipeline: [
            {
              $match: {
                sponsorPublicKey: signerPublicKey,
                $expr: { $eq: ["$topicCid", "$$topicCid"] },
              },
            },
          ],
          as: "resolves",
        },
      },
      {
        $project: {
          topicCid: 1,
          topic: { $first: "$topic" },
          resolves: 1,
          promises: 1,
          funds: 1,
          promiseTime: 1,
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
            {
              $addFields: {
                resolveCount: { $size: "$resolves" },
              },
            },
            {
              $sort: {
                resolveCount: 1,
                promiseTime: -1,
              },
            },
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
    .sort({ "indexer.blockTime": -1 })
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
        _id: "$bounty.symbol",
        value: { $sum: "$bounty.value" },
      },
    },
  ]);

  const funds = await Fund.aggregate([
    { $match: q },
    {
      $group: {
        _id: "$bounty.symbol",
        value: { $sum: "$bounty.value" },
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
    .sort({ "indexer.blockTime": -1 })
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
    .sort({ "indexer.blockTime": -1 })
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
  const q = { sponsorPublicKey: signerPublicKey };
  const promisesCountQuery = Reward.aggregate([
    { $match: q },
    { $group: { _id: "$topicCid" } },
    { $count: "total" },
  ]);

  const notFulfilledPromiseCountQuery = Reward.aggregate([
    { $match: q },
    {
      $group: {
        _id: {
          topicCid: "$topicCid",
          symbol: "$bounty.symbol",
        },
        promiseAmount: { $sum: "$bounty.value" },
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id.topicCid",
        foreignField: "topicCid",
        as: "answers",
      },
    },
    {
      $lookup: {
        from: "funds",
        let: {
          topicCid: "$_id.topicCid",
          answerCid: "$answers.cid",
          symbol: "$_id.symbol",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$sponsorPublicKey", signerPublicKey] },
                  { $eq: ["$bounty.symbol", "$$symbol"] },
                  {
                    $or: [
                      { $eq: ["$refCid", "$$topicCid"] },
                      { $in: ["$refCid", "$$answerCid"] },
                    ],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              value: { $sum: "$bounty.value" },
            },
          },
        ],
        as: "fundAmount",
      },
    },
    {
      $addFields: {
        fundAmount: { $first: "$fundAmount.value" },
      },
    },
    {
      $match: {
        $expr: {
          $lt: ["$fundAmount", "$promiseAmount"],
        },
      },
    },
    { $group: { _id: "$_id.topicCid" } },
    { $count: "count" },
  ]);

  const [
    [{ total: promisesCount = 0 } = {}] = [],
    [{ count: notFulfilledPromiseCount = 0 } = {}] = [],
    fundsCount,
    rewardsCount,
    topicsCount,
    answersCount,
  ] = await Promise.all([
    promisesCountQuery,
    notFulfilledPromiseCountQuery,
    Fund.countDocuments({ sponsorPublicKey: signerPublicKey }),
    Fund.countDocuments({ beneficiaryPublicKey: signerPublicKey }),
    Topic.countDocuments({ signerPublicKey }),
    Answer.countDocuments({ signerPublicKey }),
  ]);

  ctx.body = {
    promisesCount,
    fulfilledPromiseCount: promisesCount - notFulfilledPromiseCount,
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
