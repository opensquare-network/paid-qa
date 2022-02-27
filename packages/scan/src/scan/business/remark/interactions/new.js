const { queryNativeTokenInfo, queryAssetInfo, } = require("../../common/tokenInfo");
const { remarkLogger } = require("../../../../common/logger");
const { currentChain } = require("../../../../common/env");
const { CHAINS } = require("../../../../common/constants");
const { constants: { NATIVE_TOKEN_IDENTIFIER } } = require("@paid-qa/spec")

async function handleNew(interaction, caller, indexer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === interaction.tokenIdentifier;
  const notStatemine = [CHAINS.STATEMINE].includes(currentChain());
  const chain = currentChain();

  if (!isNativeToken && notStatemine) {
    remarkLogger.info(`Unsupported token identifier at ${ chain } #${ indexer.blockHeight }`)
    return
  }

  let tokenInfo;
  if (isNativeToken) {
    tokenInfo = await queryNativeTokenInfo()
  } else {
    tokenInfo = await queryAssetInfo(interaction.tokenIdentifier, indexer.blockHash);
  }

  if (!tokenInfo) {
    remarkLogger.info(
      `Can not find asset with token identifier ${ interaction.tokenIdentifier } at ${ chain } #${ indexer.blockHeight }`
    )
    return
  }

  // create a pending topic object
  const obj = {
    caller,
    tokenInfo: tokenInfo.toJSON(),
    tokenAmount: interaction.tokenAmount,
    topicIpfsCid: interaction.topicIpfsCid,
    indexer,
  }
  // todo: check interaction validity. Abandon if invalid
}

module.exports = {
  handleNew,
}
