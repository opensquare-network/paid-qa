const updateTopicResolve = require("@paid-qa/backend-common/src/services/resolve/updateTopicResolve");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { currentChain } = require("../../../../common/env");
const { insertResolve } = require("../../../../mongo/service/resolve");

async function handleResolve(interaction, caller, indexer) {
  const network = currentChain();

  const resolve = {
    indexer: indexer.toJSON(),
    topicCid: interaction.topicIpfsCid,
    network,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
  };

  await insertResolve(resolve);

  // await updateTopicResolve(interaction.topicIpfsCid);
}

module.exports = {
  handleResolve,
};
