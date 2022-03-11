const { isCid } = require("../common/cid");

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

  /**
   *
   * @returns {boolean}
   */
  get isValid() {
    return isCid(this.#topicIpfsCid)
  }

  get args() {
    return [this.#topicIpfsCid];
  }
}

module.exports = {
  ResolveInteraction,
}
