const {
  getPendingTopicCollection,
  getTopicCollection,
} = require("../index");

async function insertPendingTopic(pendingTopic) {
  const topicCol = await getTopicCollection();
  const maybeInTopicDb = await topicCol.findOne({ topicIpfsCid: pendingTopic.topicIpfsCid });
  if (maybeInTopicDb) {
    return;
  }

  const col = await getPendingTopicCollection()
  const maybeInPendingDb = await col.findOne({ topicIpfsCid: pendingTopic.topicIpfsCid });
  // TODO: also check the topic collection
  if (maybeInPendingDb) {
    return;
  }

  await col.insertOne(pendingTopic);
}

module.exports = {
  insertPendingTopic,
}
