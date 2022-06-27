const { insertFund } = require("../../../../mongo/service/fund");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const { getTokenInfo } = require("../common");
const { busLogger } = require("@osn/scan-common");

async function handleFundInteraction(interaction, caller, indexer, transfer) {
  const tokenInfo = await getTokenInfo(transfer.tokenIdentifier, indexer);
  if (!tokenInfo) {
    busLogger.error(
      `Invalid fund interaction with invalid token id at ${indexer.blockHeight}`
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

  let refCidType;
  const answer = await Answer.findOne({ cid: interaction.ipfsCid });
  if (answer) {
    refCidType = "answer";
  } else {
    refCidType = "topic";
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
