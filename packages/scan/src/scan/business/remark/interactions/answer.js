const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const {
  parser: { InteractionParser },
  interactions: { AnswerInteraction },
} = require("@paid-qa/spec");
const { SECTIONS, METHODS } = require("../../../../common/constants");
const { currentChain } = require("../../../../common/env");
const { insertAnswer } = require("../../../../mongo/service/answer");
const { hexToString } = require("@polkadot/util");
const { remarkLogger } = require("../../../../common/logger");

async function handleAnswer(interaction, caller, indexer) {
  const network = currentChain();

  const answer = {
    indexer: indexer.toJSON(),
    network,
    cid: interaction.answerIpfsCid,
    parsed: true,
    status: OnChainStatus.Published,
  };

  await insertAnswer(answer);
}

async function handleBatchAnswerExtrinsic(extrinsic, caller, indexer) {
  const { section, method } = extrinsic;
  if (SECTIONS.UTILITY !== section || METHODS.BATCH !== method) {
    return;
  }

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
  handleAnswer,
  handleBatchAnswerExtrinsic,
};
