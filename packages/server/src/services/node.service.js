const Api = require("./nodeApi");
const { HttpError } = require("../utils/exc");
const { NODE_API_ENDPOINT } = require("../env");

const cachedApis = {};

function getApi(chain) {
  if (!cachedApis[chain]) {
    cachedApis[chain] = new Api(`${NODE_API_ENDPOINT}/${chain}/`);
  }

  return cachedApis[chain];
}

async function getRemark(api, blockHash, extrinsicHash) {
  try {
    const result = await api.get(`remark/${blockHash}/${extrinsicHash}`);
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get remark");
  }
}

async function getNativeTokenInfo(api) {
  try {
    const result = await api.get("tokeninfo/native");
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get native token info");
  }
}

async function getAssetTokenInfo(api, assetId, blockHash) {
  try {
    const result = await api.get(`tokeninfo/asset/${assetId}/${blockHash}`);
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get asset token info");
  }
}

async function submitRemarks(api, remarks) {
  try {
    const result = await api.post("remark/batchsend", { remarks });
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to submit remarks");
  }
}

module.exports = {
  getApi,
  getRemark,
  getNativeTokenInfo,
  getAssetTokenInfo,
  submitRemarks,
};
