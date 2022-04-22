const { Topic } = require("../../models");

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid })
    .populate("rewards")
    .populate("appendants")
    .populate("funds")
    .populate("resolves");
  return topic;
}

module.exports = getTopic;
