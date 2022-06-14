const { insertReward } = require("../../../../mongo/service/reward");
const {
  queryNativeTokenInfo,
  queryAssetInfo,
} = require("../../common/tokenInfo");
const { remarkLogger } = require("../../../../common/logger");
const { currentChain } = require("../../../../common/env");
const { ASSET_PARA_CHAIN } = require("../../../../common/constants");
const {
  constants: { NATIVE_TOKEN_IDENTIFIER },
} = require("@paid-qa/spec");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  updatePromiseFulfillment,
} = require("@paid-qa/backend-common/src/services/fulfill");
const updateTopicResolve = require("@paid-qa/backend-common/src/services/resolve/updateTopicResolve");

async function handleSupport(interaction, caller, indexer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === interaction.tokenIdentifier;
  const isAssetParaChain = ASSET_PARA_CHAIN.includes(currentChain());
  const chain = currentChain();

  if (!isAssetParaChain && !isNativeToken) {
    remarkLogger.info(
      `Unsupported token identifier at ${chain} #${indexer.blockHeight}`
    );
    return;
  }

  let tokenInfo;
  if (isNativeToken) {
    tokenInfo = await queryNativeTokenInfo();
  } else {
    tokenInfo = await queryAssetInfo(
      interaction.tokenIdentifier,
      indexer.blockHash
    );
  }

  if (!tokenInfo) {
    remarkLogger.info(
      `Can not find asset with token identifier ${interaction.tokenIdentifier} at ${chain} #${indexer.blockHeight}`
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

  await updateTopicResolve(interaction.topicIpfsCid);

  // await updatePromiseFulfillment(reward.topicCid, reward.sponsorPublicKey);
}

module.exports = {
  handleSupport,
};
