const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    network: {
      type: String,
      required: true,
    },
    topicCid: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    signer: {
      type: String,
      required: true,
    },
    signerPublicKey: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    cid: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    }, // "reserved", "published", "active", "resolved"
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

AnswerSchema.index({ topicCid: 1, cid: 1 }, { unique: true });

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
