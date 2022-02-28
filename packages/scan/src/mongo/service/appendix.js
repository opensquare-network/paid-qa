const { busLogger } = require("../../common/logger");
const {
  getAppendixCollection,
} = require("../index");

async function insertAppendix(appendix) {
  const { topicIpfsCid, messageIpfsCid } = appendix;
  const col = await getAppendixCollection();
  const maybeInTopicDb = await col.findOne({ topicIpfsCid, messageIpfsCid });
  if (maybeInTopicDb) {
    busLogger.info(
      `Same topic ${ topicIpfsCid } append ${ messageIpfsCid } has existed in DB, #${ appendix.indexer.blockHeight }`
    )
    return;
  }

  await col.insertOne(appendix);
}

module.exports = {
  insertAppendix,
}
