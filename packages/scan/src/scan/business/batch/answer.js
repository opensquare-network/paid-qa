const { handleAnswer } = require("../remark/interactions/answer");
const { remarkLogger } = require("../../../common/logger");
const { SECTIONS, METHODS } = require("../../../common/constants");
const { hexToString } = require("@polkadot/util");
const {
  parser: { InteractionParser },
  interactions: { AnswerInteraction },
} = require("@paid-qa/spec");

async function handleBatchAnswer(extrinsic, caller, indexer) {
  const {
    args: [txs],
  } = extrinsic;

  for (const tx of txs) {
    const { section, method } = tx;
    if (SECTIONS.SYSTEM !== section && METHODS.REMARK !== method) {
      continue;
    }

    const {
      args: [remarkBytes],
    } = tx;
    const remark = hexToString(remarkBytes.toHex());
    remarkLogger.info(`${remark} at ${indexer.blockHeight}`);

    const parser = new InteractionParser(remark);
    if (!parser.isValid) {
      return;
    }

    const interaction = parser.getInteraction();
    if (interaction instanceof AnswerInteraction) {
      await handleAnswer(interaction, caller, indexer);
    }
  }
}

module.exports = {
  handleBatchAnswer,
};
