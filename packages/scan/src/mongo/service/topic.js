const { busLogger } = require("../../common/logger");
const { Topic } = require("@paid-qa/backend-common/src/models");

async function insertTopic(topic) {
  const { cid } = topic;
  const maybeInTopicDb = await Topic.findOne({ cid });
  if (maybeInTopicDb) {
    busLogger.info(
      `Same topic ${cid} has existed in DB, #${topic.indexer.blockHeight}`
    );
    return;
  }

  await Topic.create(topic);
}

module.exports = {
  insertTopic,
};
