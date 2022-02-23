const { SECTIONS, METHODS } = require("../../common/constants")

/**
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleExtrinsic(extrinsic, indexer) {
  const { section, method } = extrinsic.method;

  if (SECTIONS.SYSTEM === section && METHODS.REMARK === method) {
    // TODO: handle the spec remark interactions
  } else if (SECTIONS.UTILITY === section && METHODS.BATCH === method) {
    // TODO: handle the fund interaction in the spec
  }
}

module.exports = {
  handleExtrinsic,
}
