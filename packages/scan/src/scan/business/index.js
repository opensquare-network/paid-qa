const { handleFundInBatch } = require("./batch/fund");
const { handleBatchAnswer } = require("./batch/answer");
const { SECTIONS, METHODS } = require("../../common/constants");
const { handleRemarkExtrinisc } = require("./remark");

/**
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleExtrinsic(extrinsic, indexer) {
  const { section, method } = extrinsic.method;

  if (SECTIONS.SYSTEM === section && METHODS.REMARK === method) {
    await handleRemarkExtrinisc(extrinsic, indexer);
  } else if (SECTIONS.UTILITY === section && METHODS.BATCH === method) {
    const caller = extrinsic.signer.toString();

    await handleBatchAnswer(extrinsic.method, caller, indexer);
    await handleFundInBatch(extrinsic.method, caller, indexer);
  }
}

module.exports = {
  handleExtrinsic,
};
