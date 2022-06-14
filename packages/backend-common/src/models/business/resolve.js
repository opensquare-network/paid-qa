const mongoose = require("mongoose");
const { RequiredString, RequiredNumber } = require("../utils");

const ResolveSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    topicCid: RequiredString,
    network: RequiredString,
    sponsor: RequiredString,
    sponsorPublicKey: RequiredString,
  },
  {
    timestamps: true,
  }
);

ResolveSchema.index({ topicCid: 1, sponsorPublicKey: 1 }, { unique: true });
ResolveSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true }
);

module.exports = { ResolveSchema };
