const { Topic } = require("@paid-qa/backend-common/src/models");

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid })
    .select("-_id -__v -data -pinned")
    .populate({
      path: "rewards",
      select: "-_id -__v",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate({
      path: "appendants",
      select: "-_id -__v -data -pinned",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate({
      path: "funds",
      select: "-_id -__v",
    })
    .populate({
      path: "resolves",
      select: "-_id -__v",
    });

  return topic;
}

module.exports = getTopic;
