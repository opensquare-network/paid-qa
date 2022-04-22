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

  toJSON() {
    return {
      blockHeight: this.#blockHeight,
      blockHash: this.#blockHash,
      blockTime: this.#blockTime,
    };
  }
}

class ExtrinsicIndexer extends BlockIndexer {
  #extrinsicIndex;

  constructor(height, hash, time, extrinsicIndex) {
    super(height, hash, time);
    this.#extrinsicIndex = extrinsicIndex;
  }

  static create(blockIndexer, extrinsicIndex) {
    return new ExtrinsicIndexer(
      blockIndexer.blockHeight,
      blockIndexer.blockHash,
      blockIndexer.blockTime,
      extrinsicIndex
    );
  }

  get extrinsicIndex() {
    return this.#extrinsicIndex;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      extrinsicIndex: this.#extrinsicIndex,
    };
  }
}

module.exports = {
  BlockIndexer,
  ExtrinsicIndexer,
};
