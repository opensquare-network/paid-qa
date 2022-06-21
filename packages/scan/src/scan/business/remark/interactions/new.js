const { insertTopic } = require("../../../../mongo/service/topic");
const { insertReward } = require("../../../../mongo/service/reward");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { getTokenInfo } = require("../common");

async function handleNew(interaction, caller, indexer) {
  const tokenInfo = await getTokenInfo(interaction.tokenIdentifier, indexer);

  const bounty = {
    value: interaction.tokenAmount,
    tokenIdentifier: interaction.tokenIdentifier,
    ...tokenInfo.toJSON(),
  };

  const network = currentChain();

  const topic = {
    indexer: indexer.toJSON(),
    network,
    bounty,
    cid: interaction.topicIpfsCid,
    status: OnChainStatus.Published,
    signer: caller,
    signerPublicKey: toPublicKey(caller),
    parsed: false,
    resolved: false,
  };

  await insertTopic(topic);
  // todo: we just save the unparsed data first. The IPFS data cat and parsing work will be done at a dedicated worker.

  const reward = {
    indexer: indexer.toJSON(),
    network,
    bounty,
    topicCid: interaction.topicIpfsCid,
    status: OnChainStatus.Published,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
    type: "topic",
  };

  await insertReward(reward);
}

module.exports = {
  handleNew,
};
