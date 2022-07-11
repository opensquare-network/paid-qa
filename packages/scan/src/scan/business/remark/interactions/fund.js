const { insertFund } = require("../../../../mongo/service/fund");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const { getTokenInfo } = require("../common");
const { busLogger } = require("@osn/scan-common");
const BigNumber = require("bignumber.js");

async function handleFundInteraction(interaction, caller, indexer, transfer) {
  const tokenInfo = await getTokenInfo(transfer.tokenIdentifier, indexer);
  if (!tokenInfo) {
    busLogger.error(
      `Invalid fund interaction with invalid token id at ${indexer.blockHeight}`
    );
    return;
  }

  const tokenAmount = new BigNumber(transfer.value)
    .div(Math.pow(10, tokenInfo.decimals))
    .toFixed();

  const bounty = {
    value: tokenAmount,
    tokenIdentifier: transfer.tokenIdentifier,
    ...tokenInfo.toJSON(),
  };

  const beneficiary = transfer.to;
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

  // fixme: FUND interaction don't have to been put into the sync process, since there is no IPFS related issues
  //  in this interaction. We can update FUND directly to business db, so the topic funded status will be updated
  //  in time.
  await insertFund(fund);
}

module.exports = {
  handleFundInteraction,
};
