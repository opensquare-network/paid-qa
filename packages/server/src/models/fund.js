const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FundSchema = new mongoose.Schema(
  {
    blockHash: String,
    extrinsicIndex: Number,
    blockTime: Number,
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
    sponsorPublicKey: String,
    beneficiary: String,
    beneficiaryPublicKey: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

FundSchema.index({ topicCid: 1 });

FundSchema.virtual("topic", {
  ref: "Topic",
  localField: "ipfsCid",
  foreignField: "cid",
  justOne: true,
});

FundSchema.virtual("answer", {
  ref: "Answer",
  localField: "ipfsCid",
  foreignField: "cid",
  justOne: true,
});

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
