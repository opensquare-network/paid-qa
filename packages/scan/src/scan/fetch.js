const { findBlockApi } = require("../chain/blockApi");
const { blockLogger } = require("../common/logger");
const { getApi } = require("../chain/api");

async function fetchBlocks(heights = []) {
  if (heights.length <= 0) {
    throw new Error('Fetch blocks with 0 heights');
  }

  const allPromises = [];
  for (const height of heights) {
    allPromises.push(makeSureFetch(height));
  }

  return await Promise.all(allPromises);
}

async function makeSureFetch(height, doFetchAuthor = false) {
  try {
    return await fetchOneBlock(height, doFetchAuthor);
  } catch (e) {
    blockLogger.error(`error fetch block ${ height }`, e);
    return null;
  }
}

async function fetchOneBlock(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await findBlockApi(blockHash);

  const promises = [
    api.rpc.chain.getBlock(blockHash),
    blockApi.query.system.events(),
  ];

  const [block, events] = await Promise.all(promises);

  return {
    height,
    block: block.block,
    events,
  };
}

module.exports = {
  fetchOneBlock,
  fetchBlocks,
}
