const { insertFund } = require("../../../../mongo/service/fund");
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
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const { hexToString } = require("@polkadot/util");

function parseRemarkCall(txRemark) {
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

function parseTransferCall(txTransfer) {
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

function parseFundCall(txFund) {
  const { section, method } = txFund;
  if (section !== "utility" || method !== "batch") {
    return;
  }

  const {
    args: [txs],
  } = txFund;

  if (txs.length !== 2) {
    return;
  }

  const [txRemark, txTransfer] = txs;

  try {
    const { remark } = parseRemarkCall(txRemark);
    const { transfer } = parseTransferCall(txTransfer);

    return {
      remark,
      transfer,
    };
  } catch (e) {
    return;
  }
}

async function handleFund(interaction, caller, indexer, transfer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === transfer.tokenIdentifier;
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
    tokenInfo = await queryAssetInfo(
      transfer.tokenIdentifier,
      indexer.blockHash
    );
  }

  if (!tokenInfo) {
    remarkLogger.info(
      `Can not find asset with token identifier ${transfer.tokenIdentifier} at ${chain} #${indexer.blockHeight}`
    );
    return;
  }

  const bounty = {
    value: transfer.value.toJSON(),
    tokenIdentifier: transfer.tokenIdentifier,
    ...tokenInfo.toJSON(),
  };

  const beneficiary = transfer.to.toJSON()?.id;
  const beneficiaryPublicKey = toPublicKey(beneficiary);

  let topicCid, refCidType;
  const answer = await Answer.findOne({ cid: interaction.ipfsCid });
  if (answer) {
    topicCid = answer.topicCid;
    refCidType = "topic";
  } else {
    topicCid = interaction.ipfsCid;
    refCidType = "answer";
  }

  const fund = {
    indexer: indexer.toJSON(),
    network: process.env.CHAIN,
    bounty,
    refCid: interaction.ipfsCid,
    refCidType,
    status: OnChainStatus.Published,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
    beneficiary,
    beneficiaryPublicKey,
  };

  await insertFund(fund);
}

module.exports = {
  handleFund,
  parseFundCall,
};
