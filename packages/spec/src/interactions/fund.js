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
}

module.exports = {
  FundInteraction,
}
