class AnswerInteraction {
  static symbol = 'AS';
  static argsCount = 1;
  #answerIpfsCid;

  constructor(answerIpfsCid) {
    this.#answerIpfsCid = answerIpfsCid
  }

  get answerIpfsCid() {
    return this.#answerIpfsCid;
  }
}

module.exports = {
  AnswerInteraction,
}
