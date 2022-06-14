const { busLogger } = require("../../common/logger");
const { Reward } = require("@paid-qa/backend-common/src/models/dbs/scan");

async function insertReward(reward) {
  const maybeInDb = await Reward.findOne({
    "indexer.blockHash": reward.indexer.blockHash,
    "indexer.extrinsicIndex": reward.indexer.extrinsicIndex,
  });
  if (maybeInDb) {
    busLogger.info(
      `Same reward ${reward.topicCid} has existed in DB, #${reward.indexer.blockHeight}`
    );
    return;
  }

  await Reward.create(reward);
}

module.exports = {
  insertReward,
};
