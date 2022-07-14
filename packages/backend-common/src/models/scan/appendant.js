const mongoose = require("mongoose");
const { RequiredString, RequiredNumber } = require("../utils");

const AppendantSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    network: RequiredString,
    content: String,
    topicCid: RequiredString,
    cid: RequiredString,
    signer: RequiredString,
    data: Object,
    parsed: Boolean,
    synced: Boolean,
    retries: Number,
    lastRetryTime: Date,
  },
  {
    timestamps: true,
  }
);

AppendantSchema.index({ cid: 1 }, { unique: true });
AppendantSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true }
);
AppendantSchema.index({ topicCid: 1 });

module.exports = { AppendantSchema };
