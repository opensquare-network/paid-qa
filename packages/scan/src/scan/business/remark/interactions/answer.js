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
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function handleAnswer(interaction, caller, indexer) {
  // todo: 1. get the content of answer entity from ipfs
  // todo: 2. valid the signature
  // todo: 3. save the topicIpfsCid and answer related object and content to DB
  // todo: we do the upper tasks in a background worker

  const network = currentChain();

  const answer = {
    indexer: indexer.toJSON(),
    network,
    cid: interaction.answerIpfsCid,
    // signer: caller,
    // signerPublicKey: toPublicKey(caller),
    pinned: true,
    status: OnChainStatus.Published,
  };

  await insertAnswer(answer);
}

async function handleBatchAnswerExtrinsic(extrinsic, caller, indexer) {
  const { section, method } = extrinsic;
  console.log({ section, method });
  if (SECTIONS.UTILITY !== section || METHODS.BATCH !== method) {
    return;
  }

  console.log("try batch answer");

  const {
    args: [txs],
  } = extrinsic;

  for (const tx of txs) {
    const { section, method } = tx;
    console.log({ section, method });
    if (SECTIONS.SYSTEM !== section && METHODS.REMARK !== method) {
      continue;
    }

    console.log("handle batch remark");

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
      console.log("handle batch answer");
      await handleAnswer(interaction, caller, indexer);
    }
  }
}

module.exports = {
  handleAnswer,
  handleBatchAnswerExtrinsic,
};
