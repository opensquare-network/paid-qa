const { Keyring } = require("@polkadot/api");
const { hexToString } = require("@polkadot/util");
const { getApis } = require("@osn/polkadot-api-container");
const {
  isExtrinsicSuccess,
  extractBlockTime,
  isBatchSuccess,
} = require("../utils");

function handleRemarkCall(txRemark) {
  const { section, method } = txRemark;
  if (section !== "system" || method !== "remark") {
    throw new Error("Not a remark");
  }

  const {
    args: [remarkBytes],
  } = txRemark;
  const remark = hexToString(remarkBytes.toHex());
  return {
    remark,
  };
}

function handleTransferCall(txTransfer) {
  let tokenIdentifier, to, value;
  const { section, method } = txTransfer;

  if (
    section === "balances" &&
    (method === "transfer" || method === "transferKeepAlive")
  ) {
    tokenIdentifier = "N";
    [to, value] = txTransfer.args;
  } else if (section === "assets" && method === "transfer") {
    [tokenIdentifier, to, value] = txTransfer.args;
  } else {
    throw new Error("Not a transfer");
  }

  return {
    transfer: {
      tokenIdentifier,
      to,
      value,
    },
  };
}

function handleFundCall(txFund) {
  const { section, method } = txFund;
  if (section !== "utility" || method !== "batch") {
    throw new Error("Not a FUND instruction");
  }

  const {
    args: [txs],
  } = txFund;

  if (txs.length !== 2) {
    throw new Error("Not a FUND instruction: batch length is not 2");
  }

  const [txRemark, txTransfer] = txs;

  const { remark } = handleRemarkCall(txRemark);
  const { transfer } = handleTransferCall(txTransfer);

  return {
    remark,
    transfer,
  };
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

  let data;

  const extrinsic = block.block.extrinsics[extrinsicIndex];
  const { section, method } = extrinsic.method;
  if (section === "system" || method === "remark") {
    data = handleRemarkCall(extrinsic.method);
  } else if (section === "utility" && method === "batch") {
    const isBatchOk = isBatchSuccess(events, extrinsicIndex);
    if (!isBatchOk) {
      throw new Error("Batch not success");
    }

    data = handleFundCall(extrinsic.method);
  } else {
    throw new Error("Extrinsic is not a PaidQA instruction");
  }

  const signer = extrinsic.signer.toString();
  const blockTime = extractBlockTime(block.block.extrinsics);
  const blockHeight = block.block.header.number.toNumber();

  return {
    blockHash,
    extrinsicIndex,
    blockHeight,
    blockTime,
    signer,
    ...data,
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
    const remark = await getRemarkFromApis(
      apis,
      blockHash,
      parseInt(extrinsicIndex)
    );
    ctx.body = remark;
  } catch (e) {
    console.error("Get remark from node fail", e);
    if (e.errors.length > 0) {
      ctx.throw(500, e.errors[0].message);
    } else {
      ctx.throw(500, "Failed to get remark from node");
    }
  }
}

function getKeyringPair() {
  const phrase = process.env.POLKADOT_ACCOUNT_PHRASE;
  if (!phrase) {
    throw new Error("POLKADOT_ACCOUNT_PHRASE is not configured");
  }

  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase);
  console.log(pair.address);
  return pair;
}

async function batchSendRemarks(ctx) {
  const { chain } = ctx.params;
  const { remarks } = ctx.request.body;

  const apis = getApis(chain);
  for (const api of apis) {
    try {
      const keyringPair = getKeyringPair();
      const tx = api.tx.utility.batch(
        remarks.map((remark) => api.tx.system.remark(remark))
      );
      const result = await tx.signAndSend(keyringPair);
      console.log(
        "BatchSendRemarks to",
        chain,
        ":",
        remarks,
        "\nExtrinsic:",
        result.toJSON()
      );
      ctx.body = {
        status: "success",
        result: result.toJSON(),
      };
      return;
    } catch (e) {
      console.log("BatchSendRemarks:", e);
    }
  }

  ctx.body = {
    status: "failed",
  };
}

module.exports = {
  getRemark,
  batchSendRemarks,
};
