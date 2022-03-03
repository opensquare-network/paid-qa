const { remarkLogger } = require("../../../common/logger");
const { hexToString } = require("@polkadot/util")
const {
  parser: { InteractionParser },
  interactions: {
    NewInteraction,
    AppendInteraction,
    SupportInteraction,
    AnswerInteraction,
    FundInteraction,
    ResolveInteraction,
  }
} = require("@paid-qa/spec")
const { handleNew } = require("./interactions/new")
const { handleAppend } = require("./interactions/append")
const { handleSupport } = require("./interactions/support")
const { handleAnswer } = require("./interactions/answer")
const { handleFund } = require("./interactions/fund")
const { handleResolve } = require("./interactions/resolve")

/**
 *
 * @param extrinsic https://wiki.polkadot.network/docs/glossary#extrinsic
 * @param indexer ExtrinsicIndexer
 * @returns {Promise<void>}
 */
async function handleRemark(extrinsic, indexer) {
  const { args: [remarkBytes] } = extrinsic.method;
  const remark = hexToString(remarkBytes.toHex());
  remarkLogger.info(`${ remark } at ${ indexer.blockHeight }`)

  const parser = new InteractionParser(remark);
  if (!parser.isValid) {
    return
  }

  let caller = extrinsic.signer.toString();
  const interaction = parser.getInteraction();
  if (interaction instanceof NewInteraction) {
    await handleNew(interaction, caller, indexer);
  } else if (interaction instanceof AppendInteraction) {
    await handleAppend(interaction, caller, indexer);
  } else if (interaction instanceof SupportInteraction) {
    await handleSupport(interaction, caller, indexer);
  } else if (interaction instanceof AnswerInteraction) {
    await handleAnswer(interaction, caller, indexer);
  } else if (interaction instanceof FundInteraction) {
    await handleFund(interaction, caller, indexer);
  } else if (interaction instanceof ResolveInteraction) {
    await handleResolve(interaction, caller, indexer);
  }
  // TODO: 1. check the validity in each interaction handling method
  // TODO: 2. handle the business with different interactions
}

module.exports = {
  handleRemark,
}
