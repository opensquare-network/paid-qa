const mongoose = require("mongoose");
const { RequiredRefCid, RequiredDecimal128, RequiredString, RequiredNumber } = require("./utils");

const FundSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    refCid: RequiredRefCid,
    network: RequiredString,
    sponsor: RequiredString,
    sponsorPublicKey: RequiredString,
    beneficiary: RequiredString,
    beneficiaryPublicKey: RequiredString,
    bounty: {
      tokenIdentifier: RequiredString,
      symbol: RequiredString,
      decimals: RequiredNumber,
      value: RequiredDecimal128,
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

FundSchema.index({ refCid: 1 });
FundSchema.index({ sponsorPublicKey: 1 });
FundSchema.index({ beneficiaryPublicKey: 1 });
FundSchema.index({ "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 }, { unique: true });

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
