const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../../utils/exc");
const { Topic, Fund, Answer } = require("@paid-qa/backend-common/src/models");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("../node.service");
const BigNumber = require("bignumber.js");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  updatePromiseFulfillment,
} = require("@paid-qa/backend-common/src/services/fulfill");
const {
  createFundNotification,
} = require("@paid-qa/backend-common/src/services/notification/createFundNotification");

async function addFund(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, transfer, signer, blockTime, blockHeight } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is FUND instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof FundInteraction)) {
    throw new HttpError(500, "System remark is not FUND instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  // Get reward currency type and amount from system remark
  const {
    tokenIdentifier,
    to: { id: beneficiary },
    value,
  } = transfer;

  if (beneficiary === signer) {
    throw new HttpError(500, "Not allow to fund self");
  }

  let symbol, decimals;
  if (tokenIdentifier === "N") {
    ({ symbol, decimals } = await getNativeTokenInfo(api));
  } else {
    ({ symbol, decimals } = await getAssetTokenInfo(
      api,
      tokenIdentifier,
      blockHash
    ));
  }

  const tokenAmount = new BigNumber(value)
    .div(Math.pow(10, decimals))
    .toFixed();

  const sponsorPublicKey = toPublicKey(signer);
  const beneficiaryPublicKey = toPublicKey(beneficiary);

  let topic = await Topic.findOne({ cid: interaction.ipfsCid });
  let answer = await Answer.findOne({ cid: interaction.ipfsCid });

  let topicCid;
  let refCidType;
  if (topic) {
    refCidType = "topic";
    topicCid = topic.cid;
  } else if (answer) {
    refCidType = "answer";
    topicCid = answer.topicCid;
  } else {
    throw new HttpError(500, "Invalid ipfsCid");
  }

  const fundObj = await Fund.findOneAndUpdate(
    {
      "indexer.blockHash": blockHash,
      "indexer.extrinsicIndex": extrinsicIndex,
    },
    {
      "indexer.blockHeight": blockHeight,
      "indexer.blockTime": blockTime,
      refCid: interaction.ipfsCid,
      refCidType,
      network,
      sponsor: signer,
      sponsorPublicKey,
      beneficiary,
      beneficiaryPublicKey,
      bounty: {
        value: tokenAmount,
        tokenIdentifier,
        symbol,
        decimals,
      },
    },
    { upsert: true, new: true }
  );

  await updatePromiseFulfillment(topicCid, sponsorPublicKey);

  await createFundNotification(fundObj);

  return {
    beneficiary,
    symbol,
    decimals,
    value: tokenAmount,
  };
}

module.exports = addFund;
