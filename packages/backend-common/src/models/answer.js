const mongoose = require("mongoose");
const { RequireOnChainStatus, RequiredString } = require("./utils");

const AnswerSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    network: RequiredString,
    topicCid: RequiredString,
    content: RequiredString,
    signer: RequiredString,
    signerPublicKey: RequiredString,
    signature: RequiredString,
    data: {
      type: Object,
      required: true,
    },
    cid: RequiredString,
    pinned: {
      type: Boolean,
      default: false,
    },
    status: RequireOnChainStatus,
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
AnswerSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true, sparse: true }
);
AnswerSchema.index({ topicCid: 1 });

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
