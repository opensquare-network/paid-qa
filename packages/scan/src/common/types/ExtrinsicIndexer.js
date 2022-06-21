const { BlockIndexer } = require("./BlockIndexer");

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
  ExtrinsicIndexer,
};
