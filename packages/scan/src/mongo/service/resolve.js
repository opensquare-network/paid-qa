const { Resolve } = require("@paid-qa/backend-common/src/models/scan");
const { busLogger } = require("@osn/scan-common");

async function insertResolve(resolve) {
  let maybeInDb = await Resolve.findOne({
    "indexer.blockHash": resolve.indexer.blockHash,
    "indexer.extrinsicIndex": resolve.indexer.extrinsicIndex,
  });
  if (maybeInDb) {
    busLogger.info(
      `Same resolve ${resolve.topicCid} has existed in DB, #${resolve.indexer.blockHeight}`
    );
    return;
  }

  maybeInDb = await Resolve.findOne({
    topicCid: resolve.topicCid,
    sponsorPublicKey: resolve.sponsorPublicKey,
  });

  if (maybeInDb) {
    busLogger.info(
      `Same resolver and topic ${resolve.sponsor} ${resolve.topicCid} has existed in DB, #${resolve.indexer.blockHeight}`
    );
    return;
  }

  await Resolve.create(resolve);
}

module.exports = {
  insertResolve,
};
