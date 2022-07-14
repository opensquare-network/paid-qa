const { Resolve } = require("@paid-qa/backend-common/src/models/scan");
const { busLogger } = require("@osn/scan-common");

async function insertResolve(resolve) {
  const maybeInDb = await Resolve.findOne({
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
