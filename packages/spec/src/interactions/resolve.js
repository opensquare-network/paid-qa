class ResolveInteraction {
  static symbol = 'R';
  static argsCount = 1;

  #topicIpfsCid;

  constructor(topicIpfsCid) {
    this.#topicIpfsCid = topicIpfsCid
  }

  get ipfsCid() {
    return this.#topicIpfsCid;
  }
}

module.exports = {
  ResolveInteraction,
}
