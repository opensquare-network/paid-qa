const { busLogger } = require("../../common/logger");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");

async function insertAnswer(answer) {
  const maybeInDb = await Answer.findOne({ cid: answer.cid });
  if (maybeInDb) {
    busLogger.info(
      `Same answer ${answer.cid} has existed in DB, #${answer.indexer.blockHeight}`
    );
    return;
  }

  await Answer.create(answer);
}

module.exports = {
  insertAnswer,
};
