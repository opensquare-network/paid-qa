const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    topicCid: String,
    network: String,
    currencyType: String, // "native", "asset"
    assetId: Number,
    symbol: String,
    decimals: Number,
    value: {
      type: Schema.Types.Decimal128,
      get: (v) => v?.toString(),
    },
    sponsor: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

RewardSchema.index({ topicCid: 1 });

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
