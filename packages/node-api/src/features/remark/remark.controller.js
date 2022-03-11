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

function extractBlockTime(extrinsics) {
  const setTimeExtrinsic = extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set"
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

async function getRemarkFromOneApi(api, blockHash, extrinsicIndex) {
  const [block, events] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.system.events.at(blockHash),
  ]);

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
  const blockTime = extractBlockTime(block.block.extrinsics);
  const remark = hexToString(remarkBytes.toHex());
  return {
    blockHash,
    extrinsicIndex,
    blockTime,
    remark,
    signer,
  };
}

async function getRemarkFromApis(apis, blockHash, extrinsicIndex) {
  const promises = [];
  for (const api of apis) {
    promises.push(getRemarkFromOneApi(api, blockHash, extrinsicIndex));
  }

  return Promise.any(promises);
}

async function getRemark(ctx) {
  const { chain, blockHash, extrinsicIndex } = ctx.params;
  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    const remark = await getRemarkFromApis(apis, blockHash, parseInt(extrinsicIndex));
    ctx.body = remark;
  } catch (e) {
    console.error("Get remark from node fail", e);
    ctx.throw(500, "Failed to get remark from node");
  }
}

module.exports = {
  getRemark,
};
