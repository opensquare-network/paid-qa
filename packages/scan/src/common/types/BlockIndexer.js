class BlockIndexer {
  #blockHeight;
  #blockHash;
  #blockTime;

  constructor(height, hash, time) {
    this.#blockHeight = height;
    this.#blockHash = hash;
    this.#blockTime = time;
  }

  get blockHeight() {
    return this.#blockHeight;
  }

  get blockHash() {
    return this.#blockHash;
  }

  get blockTime() {
    return this.#blockTime;
  }
}

module.exports = {
  BlockIndexer,
}
