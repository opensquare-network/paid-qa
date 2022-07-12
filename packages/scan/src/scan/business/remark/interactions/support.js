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

  // fixme: 1. SUPPORT interaction don't have to been put into the sync process, since there is no IPFS related issues
  //  in this interaction. We can update SUPPORT directly to business db, so the topic supported status will be updated
  //  in time.

  // fixme: 2. don't handle support to a resolved topic.
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
