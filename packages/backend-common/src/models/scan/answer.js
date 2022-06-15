const mongoose = require("mongoose");
const { RequiredString, RequiredNumber } = require("../utils");

const AnswerSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    network: String,
    topicCid: String,
    content: String,
    signer: String,
    signerPublicKey: String,
    signature: String,
    data: Object,
    cid: RequiredString,
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
