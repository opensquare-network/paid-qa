const { insertReward } = require("../../../../mongo/service/reward");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { getTokenInfo } = require("../common");
const { busLogger } = require("@osn/scan-common");

async function handleSupport(interaction, caller, indexer) {
  const tokenInfo = await getTokenInfo(interaction.tokenIdentifier, indexer);
  if (!tokenInfo) {
    busLogger.error(
      `Invalid support interaction with invalid token id at ${indexer.blockHeight}`
    );
    return;
  }

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
