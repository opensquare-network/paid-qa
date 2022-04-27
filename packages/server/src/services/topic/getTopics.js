const { Topic } = require("../../models");
const { PostStatus } = require("../../utils/constants");
const { escapeRegex } = require("../../utils/regex");

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
    const [{ items: topics, total: [{ count: total = 0 } = {}] = [] } = {}] =
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
                  "bounty.value": { $toString: "$bounty.value" },
                },
              },
            ],
            as: "rewards",
          },
        },
        {
          $match: {
            "rewards.bounty.symbol": symbol,
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
                  statusSort: {
                    $switch: {
                      branches: [
                        { case: { $eq: ["$status", "active"] }, then: 1 },
                      ],
                      default: 2,
                    },
                  },
                },
              },
              { $sort: { statusSort: 1, "indexer.blockTime": -1 } },
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
    const topics = await Topic.aggregate()
      .match(q)
      .addFields({
        statusSort: {
          $switch: {
            branches: [{ case: { $eq: ["$status", "active"] }, then: 1 }],
            default: 2,
          },
        },
      })
      .sort({ statusSort: 1, "indexer.blockTime": -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    await Promise.all([
      Topic.populate(topics, { path: "answersCount" }),
      Topic.populate(topics, { path: "rewards" }),
    ]);

    return {
      items: topics,
      page,
      pageSize,
      total,
    };
  }
}

module.exports = getTopics;
