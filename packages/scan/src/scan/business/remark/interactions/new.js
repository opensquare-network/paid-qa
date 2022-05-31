const { insertTopic } = require("../../../../mongo/service/topic");
const {
  queryNativeTokenInfo,
  queryAssetInfo,
} = require("../../common/tokenInfo");
const { remarkLogger } = require("../../../../common/logger");
const { currentChain } = require("../../../../common/env");
const { CHAINS } = require("../../../../common/constants");
const {
  constants: { NATIVE_TOKEN_IDENTIFIER },
} = require("@paid-qa/spec");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function handleNew(interaction, caller, indexer) {
  const isNativeToken = NATIVE_TOKEN_IDENTIFIER === interaction.tokenIdentifier;
  const isAssetParaChain = [CHAINS.STATEMINE].includes(currentChain());
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

  const topic = {
    indexer: indexer.toJSON(),
    network: process.env.CHAIN,
    bounty: {
      value: interaction.tokenAmount,
      tokenIdentifier: interaction.tokenIdentifier,
      ...tokenInfo.toJSON(),
    },
    cid: interaction.topicIpfsCid,
    status: OnChainStatus.Published,
    signer: caller,
    signerPublicKey: toPublicKey(caller),
    parsed: false,
  };

  await insertTopic(topic);
  // todo: we just save the unparsed data first. The IPFS data cat and parsing work will be done at a dedicated worker.
}

module.exports = {
  handleNew,
};
