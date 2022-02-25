const { remarkLogger } = require("../../../../common/logger");
const { currentChain } = require("../../../../common/env");
const { CHAINS } = require("../../../../common/constants");
const { constants: { NATIVE_TOKEN_IDENTIFIER } } = require("@paid-qa/spec")

async function handleNew(interaction, caller, indexer) {
  if (
    NATIVE_TOKEN_IDENTIFIER !== interaction.tokenIdentifier &&
    ![CHAINS.STATEMINE].includes(currentChain())
  ) {
    remarkLogger.info(`Unsupported token identifier at ${ currentChain() } #${ indexer.blockHeight }`)
    return
  }

  // todo: check interaction validity. Abandon if invalid
}

module.exports = {
  handleNew,
}
