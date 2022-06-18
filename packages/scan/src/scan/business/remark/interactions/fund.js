const { insertFund } = require("../../../../mongo/service/fund");
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
const { Answer } = require("@paid-qa/backend-common/src/models/scan");

async function handleFundInteraction(interaction, caller, indexer, transfer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === transfer.tokenIdentifier;
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
      transfer.tokenIdentifier,
      indexer.blockHash
    );
  }

  if (!tokenInfo) {
    remarkLogger.info(
      `Can not find asset with token identifier ${transfer.tokenIdentifier} at ${chain} #${indexer.blockHeight}`
    );
    return;
  }

  const bounty = {
    value: transfer.value.toJSON(),
    tokenIdentifier: transfer.tokenIdentifier,
    ...tokenInfo.toJSON(),
  };

  const beneficiary = transfer.to.toJSON()?.id;
  const beneficiaryPublicKey = toPublicKey(beneficiary);

  let topicCid, refCidType; // fixme: shall we remove the topicCid? Since it's not used bellow.
  const answer = await Answer.findOne({ cid: interaction.ipfsCid });
  if (answer) {
    topicCid = answer.topicCid;
    refCidType = "topic"; // fixme: should it be `answer`?
  } else {
    topicCid = interaction.ipfsCid;
    refCidType = "answer";
  }

  const fund = {
    indexer: indexer.toJSON(),
    network: process.env.CHAIN,
    bounty,
    refCid: interaction.ipfsCid,
    refCidType,
    status: OnChainStatus.Published,
    sponsor: caller,
    sponsorPublicKey: toPublicKey(caller),
    beneficiary,
    beneficiaryPublicKey,
  };

  await insertFund(fund);
}

module.exports = {
  handleFundInteraction,
};
