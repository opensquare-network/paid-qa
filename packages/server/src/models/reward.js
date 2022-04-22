const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: {
        type: String,
        required: true,
      },
      blockHeight: {
        type: Number,
        required: true,
      },
      extrinsicIndex: {
        type: Number,
        required: true,
      },
      blockTime: {
        type: Number,
        required: true,
      },
    },
    topicCid: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    sponsor: {
      type: String,
      required: true,
    },
    sponsorPublicKey: {
      type: String,
      required: true,
    },
    bounty: {
      tokenIdentifier: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      decimals: {
        type: Number,
        required: true,
      },
      value: {
        type: Schema.Types.Decimal128,
        required: true,
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
