const { findBlockApi } = require("../../../chain/blockApi");
const { TokenInfo } = require("../../../common/types/TokenInfo");
const { getApi } = require("../../../chain/api");
const { hexToString } = require("@polkadot/util")

/**
 * Query and return the current chain native token info.
 * @returns {Promise<TokenInfo>}
 */
async function queryNativeTokenInfo() {
  const api = await getApi();
  const properties = await api.rpc.system.properties();
  const { tokenSymbol, tokenDecimals } = properties;
  if (tokenSymbol.isNil || tokenDecimals.isNil) {
    throw new Error("Unexpected token info")
  }

  return new TokenInfo(tokenSymbol.value[0].toString(), tokenDecimals.value[0].toNumber());
}

/**
 * Query statemine/statemint asset info at a specified block
 * @param assetId
 * @param blockHash
 * @returns {Promise<TokenInfo>}
 */
async function queryAssetInfo(assetId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const metadata = await blockApi.query.assets.metadata(assetId);
  const symbolHex = metadata.symbol.toHex();
  const decimals = metadata.decimals.toNumber();

  return new TokenInfo(hexToString(symbolHex), decimals);
}

module.exports = {
  queryNativeTokenInfo,
  queryAssetInfo,
}
