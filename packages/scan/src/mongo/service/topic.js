const { busLogger } = require("../../common/logger");
const {
  getTopicCollection,
} = require("../index");

async function insertTopic(topic) {
  const { ipfsCid } = topic;
  const col = await getTopicCollection();
  const maybeInTopicDb = await col.findOne({ ipfsCid });
  if (maybeInTopicDb) {
    busLogger.info(`Same topic ${ ipfsCid } has existed in DB, #${ topic.indexer.blockHeight }`)
    return;
  }

  await col.insertOne(topic);
}

module.exports = {
  insertTopic,
}
