const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    topicCid: String,
    network: String,
    sponsor: String,
    sponsorPublicKey: String,
    bounty: {
      tokenIdentifier: String,
      symbol: String,
      decimals: Number,
      value: {
        type: Schema.Types.Decimal128,
        get: (v) => v?.toString(),
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

RewardSchema.index({ topicCid: 1 });
RewardSchema.index({ sponsorPublicKey: 1 });
RewardSchema.index({ "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 }, { unique: true });

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
