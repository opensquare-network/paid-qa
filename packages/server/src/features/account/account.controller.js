const flatten = require("lodash.flatten");
const BigNumber = require("bignumber.js");
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

  // Load topics with promise time
  const topics = await Reward.aggregate([
    { $match: { sponsorPublicKey: signerPublicKey } },
    {
      $group: {
        _id: "$topicCid",
        promiseTime: { $max: "$indexer.blockTime" },
      },
    },
    {
      $project: {
        _id: 0,
        cid: "$_id",
        promiseTime: "$promiseTime",
      },
    },
  ]);

  // Reterive topics resolves
  await Topic.populate(topics, {
    path: "resolves",
    match: {
      sponsorPublicKey: signerPublicKey,
    },
  });

  // Sort topics with resolves and promise time
  topics.sort((a, b) => {
    const resolvesSort = a.resolves.length - b.resolves.length;
    if (resolvesSort !== 0) {
      return resolvesSort;
    }
    return b.promiseTime - a.promiseTime;
  });

  // Get paginated result
  const paginatedTopics = topics.slice((page - 1) * pageSize, page * pageSize);

  await Topic.populate(paginatedTopics, {
    path: "rewards",
    match: {
      sponsorPublicKey: signerPublicKey,
    },
  });

  await Topic.populate(paginatedTopics, {
    path: "funds",
    match: {
      sponsorPublicKey: signerPublicKey,
    },
  });

  await Topic.populate(paginatedTopics, {
    path: "answers",
    populate: {
      path: "funds",
      match: {
        sponsorPublicKey: signerPublicKey,
      },
    },
  });

  // Load topic details
  const topicDetails = await Topic.find({
    cid: { $in: paginatedTopics.map((item) => item.cid) },
  });
  for (const topic of paginatedTopics) {
    topic.topic = topicDetails.find((item) => item.cid === topic.cid);
  }

  // Calculate supports
  for (const topic of paginatedTopics) {
    topic.promiseStats = [];

    for (const reward of topic.rewards) {
      const item = topic.promiseStats.find(
        (item) => item.symbol === reward.bounty.symbol
      );
      if (item) {
        item.value = new BigNumber(item.value || 0)
          .plus(reward.bounty.value)
          .toFixed();
      } else {
        topic.promiseStats.push({
          symbol: reward.bounty.symbol,
          value: reward.bounty.value,
        });
      }
    }
  }

  // Calcuate funds
  for (const topic of paginatedTopics) {
    topic.fundStats = [];

    const allFunds = [
      ...topic.funds,
      ...flatten(topic.answers.map((answer) => answer.funds)),
    ];
    for (const fund of allFunds) {
      const item = topic.fundStats.find(
        (item) => item.symbol === fund.bounty.symbol
      );
      if (item) {
        item.value = new BigNumber(item.value || 0)
          .plus(fund.bounty.value)
          .toFixed();
      } else {
        topic.fundStats.push({
          symbol: fund.bounty.symbol,
          value: fund.bounty.value,
        });
      }
    }
  }

  ctx.body = {
    items: paginatedTopics.map((item) => {
      return {
        topicCid: item.cid,
        resolves: item.resolves,
        resolvesCount: item.resolves.length,
        promises: item.promiseStats,
        funds: item.fundStats,
        promiseTime: item.promiseTime,
        topic: item.topic,
      };
    }),
    page,
    pageSize,
    total: topics.length,
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

  const promisesCountQuery = Reward.aggregate([
    { $match: { sponsorPublicKey: signerPublicKey } },
    { $group: { _id: "$topicCid" } },
    { $count: "total" },
  ]);

  const notFulfilledPromiseCountQuery = Reward.aggregate([
    // Find out all topics that have promised by signer,
    // and calculate the promised amount for each topic
    { $match: { sponsorPublicKey: signerPublicKey } },
    {
      $group: {
        _id: {
          topicCid: "$topicCid",
          symbol: "$bounty.symbol",
        },
        promiseAmount: { $sum: "$bounty.value" },
      },
    },
    // Find out related answers for all topics
    {
      $lookup: {
        from: "answers",
        localField: "_id.topicCid",
        foreignField: "topicCid",
        as: "answers",
      },
    },
    // Find out all funds that hsd made by thesigner, for each promised topics.
    // Including funds to the topic creator and all answerers
    {
      $lookup: {
        from: "funds",
        let: {
          topicCid: "$_id.topicCid",
          answerCid: "$answers.cid",
          symbol: "$_id.symbol",
        },
        pipeline: [
          // Filter out funds that are not related to this topic and answers
          // made by the signer and with the same symbol
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
          // Sum up all funds
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
    // Find the numbers of topics that are not fulfilled, (those fundAmount < promiseAmount)
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
