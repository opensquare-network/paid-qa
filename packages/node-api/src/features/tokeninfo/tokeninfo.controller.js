const { getApis, getBlockApi } = require("@osn/polkadot-api-container");
const { hexToString } = require("@polkadot/util");

async function getNativeTokenInfoFromOneApi(api) {
  const properties = await api.rpc.system.properties();
  const { tokenSymbol, tokenDecimals } = properties;
  if (tokenSymbol.isNil || tokenDecimals.isNil) {
    throw new Error("Unexpected token info");
  }

  return {
    symbol: tokenSymbol.value[0].toString(),
    decimals: tokenDecimals.value[0].toNumber(),
  };
}

async function getNativeTokenInfoFromApis(apis) {
  const promises = [];
  for (const api of apis) {
    promises.push(getNativeTokenInfoFromOneApi(api));
  }

  return Promise.any(promises);
}

async function getNativeTokenInfo(ctx) {
  const { chain } = ctx.params;
  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    const tokenInfo = await getNativeTokenInfoFromApis(apis);
    ctx.body = tokenInfo;
  } catch (e) {
    console.error("Get token info from node fail", e);
    ctx.throw(500, "Failed to get token info from node");
  }
}

async function getAssetTokenInfoFromOneApi(api, blockHash, assetId) {
  const blockApi = await getBlockApi(api, blockHash);
  const asset = await blockApi.query.assets.asset(assetId);
  if (asset.isNone) {
    return null;
  }

  const metadata = await blockApi.query.assets.metadata(assetId);
  const symbol = hexToString(metadata.symbol.toHex());
  const decimals = metadata.decimals.toNumber();

  return {
    symbol,
    decimals,
  };
}

async function getAssetTokenInfoFromApis(apis, blockHash, assetId) {
  const promises = [];
  for (const api of apis) {
    promises.push(getAssetTokenInfoFromOneApi(api, blockHash, assetId));
  }

  return Promise.any(promises);
}

async function getAssetTokenInfo(ctx) {
  const { chain, blockHash, assetId } = ctx.params;
  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    const tokenInfo = await getAssetTokenInfoFromApis(apis, blockHash, assetId);
    ctx.body = tokenInfo;
  } catch (e) {
    console.error("Get token info from node fail", e);
    ctx.throw(500, "Failed to get token info from node");
  }
}

module.exports = {
  getNativeTokenInfo,
  getAssetTokenInfo,
};
