const { Topic } = require("@paid-qa/backend-common/src/models");

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid })
    .populate({
      path: "rewards",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate({
      path: "appendants",
      options: { sort: { "indexer.blockTime": 1 } },
    })
    .populate("funds")
    .populate("resolves");
  return topic;
}

module.exports = getTopic;
