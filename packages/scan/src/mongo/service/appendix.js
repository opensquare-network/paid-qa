const { busLogger } = require("../../common/logger");
const { Appendant } = require("@paid-qa/backend-common/src/models");

async function insertAppendix(appendix) {
  const { topicCid: topicIpfsCid, cid: messageIpfsCid } = appendix;

  const maybeInDb = await Appendant.findOne({
    topicCid: topicIpfsCid,
    cid: messageIpfsCid,
  });
  if (maybeInDb) {
    busLogger.info(
      `Same appendix ${topicIpfsCid} append ${messageIpfsCid} has existed in DB, #${appendix.indexer.blockHeight}`
    );
    return;
  }

  await Appendant.create(appendix);
}

module.exports = {
  insertAppendix,
};
