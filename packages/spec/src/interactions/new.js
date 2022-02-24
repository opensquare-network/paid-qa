class NewInteraction {
  static symbol = 'N';

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
}

module.exports = {
  NewInteraction
}
