const { getApis } = require("../../apis");
const { hexToString } = require("@polkadot/util");

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

function findExtrinsicIndex(extrinsics, extrinsicHash) {
  return extrinsics.findIndex(
    (extrinsic) => extrinsic.hash.toJSON() === extrinsicHash
  );
}

async function getRemarkFromOneApi(api, blockHash, extrinsicHash) {
  const [block, events] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.system.events.at(blockHash),
  ]);

  const extrinsicIndex = findExtrinsicIndex(
    block.block.extrinsics,
    extrinsicHash
  );
  if (extrinsicIndex < 0) {
    throw new Error("Extrinsic not found");
  }

  const isSuccess = isExtrinsicSuccess(events, extrinsicIndex);
  if (!isSuccess) {
    throw new Error("Extrinsic not success");
  }

  const extrinsic = block.block.extrinsics[extrinsicIndex];
  const { section, method } = extrinsic.method;
  if (section !== "system" || method !== "remark") {
    throw new Error("Extrinsic is not a system remark");
  }

  const {
    args: [remarkBytes],
  } = extrinsic.method;
  const signer = extrinsic.signer.toString();
  const remark = hexToString(remarkBytes.toHex());
  return {
    blockHash,
    extrinsicHash,
    remark,
    signer,
  };
}

async function getRemarkFromApis(apis, blockHash, extrinsicHash) {
  const promises = [];
  for (const api of apis) {
    promises.push(getRemarkFromOneApi(api, blockHash, extrinsicHash));
  }

  return Promise.any(promises);
}

async function getRemark(ctx) {
  const { chain, blockHash, extrinsicHash } = ctx.params;
  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    const remark = await getRemarkFromApis(apis, blockHash, extrinsicHash);
    ctx.body = remark;
  } catch (e) {
    console.error("Get remark from node fail", e);
    ctx.throw(500, "Failed to get remark from node");
  }
}

module.exports = {
  getRemark,
};
