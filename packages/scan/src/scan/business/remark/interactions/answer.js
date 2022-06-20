const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { currentChain } = require("../../../../common/env");
const { insertAnswer } = require("../../../../mongo/service/answer");

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

module.exports = {
  handleAnswer,
};
