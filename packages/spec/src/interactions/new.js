const { isCid } = require("../common/cid");
const { isTokenAmountValid } = require("../common/tokenAmount");
const { isTokenIdentifierValid } = require("../common/tokenIdentifier");

class NewInteraction {
  static symbol = 'N';
  static argsCount = 3;

  #tokenIdentifier;
  #tokenAmount;
  #topicIpfsCid;

  constructor(tokenIdentifier, tokenAmount, topicIpfsCid) {
    this.#tokenIdentifier = tokenIdentifier;
    this.#tokenAmount = tokenAmount;
    this.#topicIpfsCid = topicIpfsCid;
  }

  get tokenIdentifier() {
    return this.#tokenIdentifier;
  }

  get tokenAmount() {
    return this.#tokenAmount;
  }

  get topicIpfsCid() {
    return this.#topicIpfsCid;
  }

  /**
   *
   * @returns {boolean}
   */
  get isValid() {
    if (!isCid(this.#topicIpfsCid)) {
      return false
    }

    if (!isTokenIdentifierValid(this.#tokenIdentifier)) {
      return false
    }

    return isTokenAmountValid(this.#tokenAmount);
  }
}

module.exports = {
  NewInteraction
}
