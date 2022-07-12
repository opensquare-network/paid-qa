const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { currentChain } = require("../../../../common/env");
const { insertResolve } = require("../../../../mongo/service/resolve");

async function handleResolve(interaction, caller, indexer) {
  const network = currentChain();

  // fixme: resolve interaction don't have to been put into the sync process, since there is no IPFS related issues
  //  in this interaction. We can update resolve directly to business db, so the topic resolve status will be updated
  //  in time.
  const resolve = {
    indexer: indexer.toJSON(),
    topicCid: interaction.topicIpfsCid,
    network,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
  };

  await insertResolve(resolve);
}

module.exports = {
  handleResolve,
};
