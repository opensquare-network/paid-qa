const { hexToString } = require("@polkadot/util");
const {
  parser: { InteractionParser },
  interactions: {
    NewInteraction,
    AppendInteraction,
    SupportInteraction,
    AnswerInteraction,
    ResolveInteraction,
  },
} = require("@paid-qa/spec");
const { handleNew } = require("./interactions/new");
const { handleAppend } = require("./interactions/append");
const { handleSupport } = require("./interactions/support");
const { handleAnswer } = require("./interactions/answer");
const { handleResolve } = require("./interactions/resolve");
const { busLogger } = require("@osn/scan-common");

/**
 *
 * @param remark the remark string
 * @param caller the remark caller
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleRemark(remark, caller, indexer) {
  const parser = new InteractionParser(remark);
  if (!parser.isValid) {
    return;
  }

  const interaction = parser.getInteraction();
  if (interaction instanceof NewInteraction) {
    await handleNew(interaction, caller, indexer);
  } else if (interaction instanceof AppendInteraction) {
    await handleAppend(interaction, caller, indexer);
  } else if (interaction instanceof SupportInteraction) {
    await handleSupport(interaction, caller, indexer);
  } else if (interaction instanceof AnswerInteraction) {
    await handleAnswer(interaction, caller, indexer);
  } else if (interaction instanceof ResolveInteraction) {
    await handleResolve(interaction, caller, indexer);
  }
}

async function handleRemarkExtrinisc(extrinsic, indexer) {
  const {
    args: [remarkBytes],
  } = extrinsic.method;
  const remark = hexToString(remarkBytes.toHex());
  busLogger.info(`${remark} at ${indexer.blockHeight}`);
  let caller = extrinsic.signer.toString();

  return await handleRemark(remark, caller, indexer);
}

module.exports = {
  handleRemark,
  handleRemarkExtrinisc,
};
