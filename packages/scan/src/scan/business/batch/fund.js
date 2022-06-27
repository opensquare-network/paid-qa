const { handleFundInteraction } = require("../remark/interactions/fund");
const { hexToString } = require("@polkadot/util");
const { SECTIONS, METHODS } = require("../../../common/constants");
const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");

function parseTransferCall(txTransfer) {
  let tokenIdentifier, to, value;
  const { section, method } = txTransfer;

  if (
    section === "balances" &&
    ["transfer", "transferKeepAlive"].includes(method)
  ) {
    tokenIdentifier = "N";
    to = txTransfer.args[0].toString();
    value = txTransfer.args[1].toJSON();
  } else if (section === "assets" && method === "transfer") {
    tokenIdentifier = txTransfer.args[0].toString();
    to = txTransfer.args[1].toString();
    value = txTransfer.args[2].toJSON();
  } else {
    throw new Error("Not a transfer");
  }

  return {
    tokenIdentifier,
    to,
    value,
  };
}

async function handleFundInBatch(batchCall, caller, indexer) {
  const {
    args: [txs],
  } = batchCall;
  if (txs.length !== 2) {
    return;
  }

  const [remarkCall, transferCall] = txs;
  const { section, method } = remarkCall;
  if (section !== SECTIONS.SYSTEM || method !== METHODS.REMARK) {
    return;
  }

  const {
    args: [remarkBytes],
  } = remarkCall;
  const remark = hexToString(remarkBytes.toHex());

  const parser = new InteractionParser(remark);
  if (!parser.isValid) {
    return;
  }

  const interaction = parser.getInteraction();
  if (!(interaction instanceof FundInteraction)) {
    return;
  }

  let transfer;
  try {
    transfer = parseTransferCall(transferCall);
  } catch (e) {
    return;
  }

  await handleFundInteraction(interaction, caller, indexer, transfer);
}

module.exports = {
  handleFundInBatch,
};
