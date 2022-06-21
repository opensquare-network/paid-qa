const {
  queryNativeTokenInfo,
  queryAssetInfo,
} = require("../../common/tokenInfo");
const { remarkLogger } = require("../../../../common/logger");
const { currentChain } = require("../../../../common/env");
const { ASSET_PARA_CHAIN } = require("../../../../common/constants");
const {
  constants: { NATIVE_TOKEN_IDENTIFIER },
} = require("@paid-qa/spec");

async function getTokenInfo(tokenIdentifier, indexer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === tokenIdentifier;
  const isAssetParaChain = ASSET_PARA_CHAIN.includes(currentChain());
  const chain = currentChain();

  if (!isAssetParaChain && !isNativeToken) {
    remarkLogger.info(
      `Unsupported token identifier at ${chain} #${indexer.blockHeight}`
    );
    return;
  }

  let tokenInfo;
  if (isNativeToken) {
    tokenInfo = await queryNativeTokenInfo();
  } else {
    tokenInfo = await queryAssetInfo(tokenIdentifier, indexer.blockHash);
  }

  if (!tokenInfo) {
    remarkLogger.info(
      `Can not find asset with token identifier ${tokenIdentifier} at ${chain} #${indexer.blockHeight}`
    );
    return;
  }

  return tokenInfo;
}

module.exports = {
  getTokenInfo,
};
