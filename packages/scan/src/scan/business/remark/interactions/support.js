const { insertReward } = require("../../../../mongo/service/reward");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { getTokenInfo } = require("../common");

async function handleSupport(interaction, caller, indexer) {
  const tokenInfo = await getTokenInfo(interaction.tokenIdentifier, indexer);

  const bounty = {
    value: interaction.tokenAmount,
    tokenIdentifier: interaction.tokenIdentifier,
    ...tokenInfo.toJSON(),
  };

  const reward = {
    indexer: indexer.toJSON(),
    network: process.env.CHAIN,
    bounty,
    topicCid: interaction.topicIpfsCid,
    status: OnChainStatus.Published,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
    type: "support",
  };

  await insertReward(reward);
}

module.exports = {
  handleSupport,
};
