const { busLogger } = require("../../common/logger");
const { Fund } = require("@paid-qa/backend-common/src/models");

async function insertFund(fund) {
  const maybeInDb = await Fund.findOne({
    "indexer.blockHash": fund.indexer.blockHash,
    "indexer.extrinsicIndex": fund.indexer.extrinsicIndex,
  });
  if (maybeInDb) {
    busLogger.info(
      `Same fund ${fund.topicCid} has existed in DB, #${fund.indexer.blockHeight}`
    );
    return;
  }

  await Fund.create(fund);
}

module.exports = {
  insertFund,
};
