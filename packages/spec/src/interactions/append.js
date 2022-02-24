class AppendInteraction {
  static symbol = 'A';
  static argsCount = 2;

  #topicIpfsCid;
  #messageIpfsCid;

  constructor(topicIpfsCid, messageIpfsCid) {
    this.#topicIpfsCid = topicIpfsCid;
    this.#messageIpfsCid = messageIpfsCid;
  }

  get topicIpfsCid() {
    return this.#topicIpfsCid;
  }

  get messageIpfsCid() {
    return this.#messageIpfsCid;
  }
}

module.exports = {
  AppendInteraction,
}
