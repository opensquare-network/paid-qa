const { SECTIONS, METHODS } = require("../../common/constants")
const { handleRemark } = require("./remark")

/**
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleExtrinsic(extrinsic, indexer) {
  const { section, method } = extrinsic.method;

  if (SECTIONS.SYSTEM === section && METHODS.REMARK === method) {
    await handleRemark(extrinsic, indexer);
  } else if (SECTIONS.UTILITY === section && METHODS.BATCH === method) {
    // TODO: handle the fund interaction in the spec
  }
}

module.exports = {
  handleExtrinsic,
}
