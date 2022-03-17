const { isCid } = require("../common/cid");
const { isTokenAmountValid } = require("../common/tokenAmount");
const { isTokenIdentifierValid } = require("../common/tokenIdentifier");

class SupportInteraction {
  static symbol = 'S';
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

  get args() {
    return [this.#tokenIdentifier, this.#tokenAmount, this.#topicIpfsCid];
  }

  toJSON() {
    return {
      tokenIdentifier: this.#tokenIdentifier,
      tokenAmount: this.#tokenAmount,
      topicIpfsCid: this.#topicIpfsCid,
    }
  }
}

module.exports = {
  SupportInteraction,
}
