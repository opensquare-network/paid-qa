const { hexToString } = require("@polkadot/util")

/**
 *
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleRemark(extrinsic, indexer) {
  const { args: [remarkBytes] } = extrinsic.method;
  const remark = hexToString(remarkBytes.toHex());

  console.log(remark);
  // TODO: 1. check whether it is interaction directive of osn paid-qa
  // TODO: 2. check the directive type
  // TODO: 3. handle the business with different interactions
}

module.exports = {
  handleRemark,
}
