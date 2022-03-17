const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FundSchema = new mongoose.Schema(
  {
    ipfsCid: String,
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

FundSchema.index({ topicCid: 1 });

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
