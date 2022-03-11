const { isCid } = require("../common/cid");

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

  /**
   *
   * @returns {boolean}
   */
  get isValid() {
    return isCid(this.#answerIpfsCid);
  }

  get args() {
    return [this.#answerIpfsCid];
  }
}

module.exports = {
  AnswerInteraction,
}
