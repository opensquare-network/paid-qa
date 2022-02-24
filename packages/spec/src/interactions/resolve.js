class ResolveInteraction {
  static symbol = 'R';
  #topicIpfsCid;

  constructor(topicIpfsCid) {
    this.#topicIpfsCid = topicIpfsCid
  }

  get answerIpfsCid() {
    return this.#topicIpfsCid;
  }
}

module.exports = {
  ResolveInteraction,
}
