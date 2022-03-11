const { isHex } = require("@polkadot/util");
const isNil = require("lodash.isnil");

async function getBlockApi(api, blockHashOrHeight) {
  if (!blockHashOrHeight) {
    return api;
  }

  if (isHex(blockHashOrHeight)) {
    return await api.at(blockHashOrHeight);
  } else if (/^\d+$/.test(blockHashOrHeight)) {
    const hash = await api.rpc.chain.getBlockHash(blockHashOrHeight);
    return await api.at(hash);
  }

  throw new Error("Invalid block hash or height");
}

async function getBlockHashFromApi(api, blockHeight) {
  if (isNil(blockHeight)) {
    const hash = await api.rpc.chain.getBlockHash();
    return hash.toString();
  }

  const hash = await api.rpc.chain.getBlockHash(blockHeight);
  return hash.toString();
}

async function getBlockHash(apis, blockHashOrHeight) {
  if (isHex(blockHashOrHeight)) {
    return blockHashOrHeight;
  }

  const promises = [];
  for (const api of apis) {
    promises.push(getBlockHashFromApi(api, blockHashOrHeight));
  }

  return Promise.any(promises);
}

function extractExtrinsicEvents(events, extrinsicIndex) {
  return events.filter((event) => {
    const { phase } = event;
    return !phase.isNone && phase.value.toNumber() === extrinsicIndex;
  });
}

function isExtrinsicSuccess(events, extrinsicIndex) {
  const extrinsicEvents = extractExtrinsicEvents(events, extrinsicIndex);
  return extrinsicEvents.some((e) => e.event.method === "ExtrinsicSuccess");
}

function extractBlockTime(extrinsics) {
  const setTimeExtrinsic = extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set"
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

module.exports = {
  getBlockApi,
  getBlockHash,
  isExtrinsicSuccess,
  extractBlockTime,
};
