const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FundSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    refCid: String,
    network: String,
    sponsor: String,
    sponsorPublicKey: String,
    beneficiary: String,
    beneficiaryPublicKey: String,
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

FundSchema.index({ topicCid: 1 });

FundSchema.virtual("topic", {
  ref: "Topic",
  localField: "refCid",
  foreignField: "cid",
  justOne: true,
});

FundSchema.virtual("answer", {
  ref: "Answer",
  localField: "refCid",
  foreignField: "cid",
  justOne: true,
});

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
