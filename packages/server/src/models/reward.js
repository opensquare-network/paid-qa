const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RewardSchema = new mongoose.Schema({
  // Indexer will be set by the scanner
  indexer: {
    network: String,
    blockHeight: Number,
    blockTime: Number,
    extrinsicIndex: Number,
  },
  topicCid: String,
  network: String,
  currencyType: String, // "native", "asset"
  assetId: Number,
  symbol: String,
  value: Schema.Types.Decimal128,
  sponsor: String,
}, {
  timestamps: true,
});

RewardSchema.index({ topicCid: 1 });

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
