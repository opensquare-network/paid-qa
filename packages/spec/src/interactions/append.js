const { isCid } = require("../common/cid");

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

  /**
   *
   * @returns {boolean}
   */
  get isValid() {
    if (!isCid(this.#topicIpfsCid)) {
      return false
    }

    return isCid(this.#topicIpfsCid);
  }

  toJSON() {
    return {
      messageIpfsCid: this.#messageIpfsCid,
      topicIpfsCid: this.#topicIpfsCid,
    }
  }
}

module.exports = {
  AppendInteraction,
}
