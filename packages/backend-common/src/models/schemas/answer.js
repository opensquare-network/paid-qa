const mongoose = require("mongoose");
const { RequireOnChainStatus, RequiredString } = require("../utils");

const AnswerSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    network: RequiredString,
    topicCid: String,
    content: String,
    signer: String,
    signerPublicKey: String,
    signature: String,
    data: Object,
    cid: RequiredString,
    pinned: Boolean,
    status: RequireOnChainStatus,
    parsed: Boolean,
    synced: Boolean,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

AnswerSchema.virtual("funds", {
  ref: "Fund",
  localField: "cid",
  foreignField: "refCid",
});

AnswerSchema.virtual("topic", {
  ref: "Topic",
  localField: "topicCid",
  foreignField: "cid",
  justOne: true,
});

AnswerSchema.index({ cid: 1 }, { unique: true });
AnswerSchema.index({ topicCid: 1 });

module.exports = { AnswerSchema };
