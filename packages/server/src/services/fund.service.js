const {
  parser: { InteractionParser },
  interactions: { FundInteraction },
} = require("@paid-qa/spec");
const { HttpError } = require("../utils/exc");
const { Topic, Answer, Fund } = require("../models");
const { RewardCurrencyType } = require("../utils/constants");
const {
  getApi,
  getRemark,
  getAssetTokenInfo,
  getNativeTokenInfo,
} = require("./node.service");
const BigNumber = require("bignumber.js");

async function addFund(network, blockHash, extrinsicIndex) {
  // Get system remark from network/blockHash/extrinsicIndex
  const api = await getApi(network);
  const { remark, transfer, signer, blockTime } = await getRemark(
    api,
    blockHash,
    extrinsicIndex
  );

  // Parse system remark to verify if it is NEW instruction
  const interaction = new InteractionParser(remark).getInteraction();
  if (!(interaction instanceof FundInteraction)) {
    throw new HttpError(500, "System remark is not FUND instruction");
  }

  if (!interaction.isValid) {
    throw new HttpError(500, "System remark is not valid");
  }

  // Get reward currency type and amount from system remark
  const { tokenIdentifier, to: { id: beneficiary }, value } = transfer;

  let symbol, decimals, rewardCurrencyType;
  if (tokenIdentifier === "N") {
    rewardCurrencyType = RewardCurrencyType.Native;
    ({ symbol, decimals } = await getNativeTokenInfo(api));
  } else {
    rewardCurrencyType = RewardCurrencyType.Asset;
    ({ symbol, decimals } = await getAssetTokenInfo(
      api,
      tokenIdentifier,
      blockHash
    ));
  }

  const tokenAmount = new BigNumber(value).div(Math.pow(10, decimals)).toFixed();

  await Fund.create({
    blockTime,
    ipfsCid: interaction.ipfsCid,
    network,
    sponsor: signer,
    beneficiary,
    currencyType: rewardCurrencyType,
    value: tokenAmount,
    ...(rewardCurrencyType === RewardCurrencyType.Asset
      ? { assetId: tokenIdentifier }
      : {}),
    symbol,
    decimals,
  });

  return {
    beneficiary,
    symbol,
    decimals,
    value: tokenAmount,
  };
}

module.exports = {
  addFund,
};
