const { SECTIONS, METHODS } = require("../../common/constants");
const { handleRemark, handleRemarkExtrinisc } = require("./remark");
const { handleBatchAnswerExtrinsic } = require("./remark/interactions/answer");
const { parseFundCall } = require("./remark/interactions/fund");

/**
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleExtrinsic(extrinsic, indexer) {
  const { section, method } = extrinsic.method;

  console.log("EEE");

  if (SECTIONS.SYSTEM === section && METHODS.REMARK === method) {
    await handleRemarkExtrinisc(extrinsic, indexer);
  } else if (SECTIONS.UTILITY === section && METHODS.BATCH === method) {
    const caller = extrinsic.signer.toString();

    console.log("BBB");
    await handleBatchAnswerExtrinsic(extrinsic.method, caller, indexer);

    const fund = parseFundCall(extrinsic.method);
    if (fund) {
      const { remark, transfer } = fund;
      await handleRemark(remark, caller, indexer, transfer);
    }
  }
}

module.exports = {
  handleExtrinsic,
};
