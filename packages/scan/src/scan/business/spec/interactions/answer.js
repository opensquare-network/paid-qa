class AnswerInteraction {
  static symbol = 'AS';
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
