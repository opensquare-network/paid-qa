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

  toJSON() {
    return {
      symbol: this.#symbol,
      decimals: this.#decimals,
    }
  }
}

module.exports = {
  TokenInfo,
}
