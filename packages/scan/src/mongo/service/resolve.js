const { busLogger } = require("../../common/logger");
const { Resolve } = require("@paid-qa/backend-common/src/models");

async function insertResolve(resolve) {
  const maybeInDb = await Resolve.findOne({
    "indexer.blockHash": resolve.indexer.blockHash,
    "indexer.extrinsicIndex": resolve.indexer.extrinsicIndex,
  });
  if (maybeInDb) {
    busLogger.info(
      `Same resolve ${resolve.topicCid} has existed in DB, #${resolve.indexer.blockHeight}`
    );
    return;
  }

  await Resolve.create(resolve);
}

module.exports = {
  insertResolve,
};
