const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RewardSchema = new mongoose.Schema({
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
