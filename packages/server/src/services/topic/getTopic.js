const { Topic } = require("@paid-qa/backend-common/src/models");

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid })
    .select("-__v -data")
    .populate({
      path: "rewards",
      select: "-__v",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate({
      path: "appendants",
      select: "-__v -data",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate({
      path: "funds",
      select: "-__v",
    })
    .populate({
      path: "resolves",
      select: "-__v",
    });

  return topic;
}

module.exports = getTopic;
