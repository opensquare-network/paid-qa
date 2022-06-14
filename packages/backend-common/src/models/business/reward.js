const mongoose = require("mongoose");
const {
  RequireOnChainStatus,
  RequiredDecimal128,
  RequiredString,
  RequiredNumber,
} = require("../utils");

const RewardSchema = new mongoose.Schema(
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
    bounty: {
      tokenIdentifier: RequiredString,
      symbol: RequiredString,
      decimals: RequiredNumber,
      value: RequiredDecimal128,
    },
    type: {
      type: String,
      enum: ["topic", "support"],
      required: true,
    },
    status: RequireOnChainStatus,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

RewardSchema.index({ topicCid: 1 });
RewardSchema.index({ sponsorPublicKey: 1 });
RewardSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true }
);

module.exports = { RewardSchema };
