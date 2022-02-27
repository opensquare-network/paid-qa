const {
  getTopicCollection,
} = require("../index");

async function insertTopic(pendingTopic) {
  const col = await getTopicCollection();
  const maybeInTopicDb = await col.findOne({ topicIpfsCid: pendingTopic.topicIpfsCid });
  if (maybeInTopicDb) {
    return;
  }

  await col.insertOne(pendingTopic);
}

module.exports = {
  insertTopic,
}
