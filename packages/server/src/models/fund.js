const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FundSchema = new mongoose.Schema(
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
    refCid: {
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
    beneficiary: {
      type: String,
      required: true,
    },
    beneficiaryPublicKey: {
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
