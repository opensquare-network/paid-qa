class TokenInfo {
  #symbol;
  #decimals;

  constructor(symbol, decimals) {
    this.#symbol = symbol;
    this.#decimals = decimals;
  }

  get symbol() {
    return this.#symbol;
  }

  get decimals() {
    return this.#decimals;
  }
}

module.exports = {
  TokenInfo,
}
