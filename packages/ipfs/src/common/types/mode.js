class ClientMode {
  /**
   * 0 means use both infura and local client;
   * 1 means use only the local client;
   * 2 means use only the infura client;
   * @type {number}
   */
  #mode = 0;

  constructor(mode) {
    this.#mode = mode;
  }

  get mode() {
    return this.#mode;
  }

  static Both = new ClientMode(0);
  static Local = new ClientMode(1);
  static Infura = new ClientMode(2);
}

module.exports = {
  ClientMode,
};
