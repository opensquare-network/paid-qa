const { isCid } = require("../common/cid");

class FundInteraction {
  static symbol = 'F';
  static argsCount = 1;

  #ipfsCid;

  constructor(ipfsCid) {
    this.#ipfsCid = ipfsCid;
  }

  get ipfsCid() {
    return this.#ipfsCid;
  }

  /**
   *
   * @returns {boolean}
   */
  get isValid() {
    return isCid(this.#ipfsCid)
  }

  get args() {
    return [this.#ipfsCid];
  }
}

module.exports = {
  FundInteraction,
}
