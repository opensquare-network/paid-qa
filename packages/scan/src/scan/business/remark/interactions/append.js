const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { currentChain } = require("../../../../common/env");
const { insertAppendix } = require("../../../../mongo/service/appendix");

async function handleAppend(interaction, caller, indexer) {
  const network = currentChain();

  const appendix = {
    indexer: indexer.toJSON(),
    network,
    topicCid: interaction.topicIpfsCid,
    cid: interaction.messageIpfsCid,
    status: OnChainStatus.Published,
    signer: caller,
    signerPublicKey: toPublicKey(caller),
    parsed: false,
  };

  await insertAppendix(appendix);
}

module.exports = {
  handleAppend,
};
