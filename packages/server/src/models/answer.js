const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    network: String,
    topicCid: String,
    content: String,
    signer: String,
    signerPublicKey: String,
    signature: String,
    data: Object,
    cid: String,
    pinned: {
      type: Boolean,
      default: false,
    },
    status: String, // "reserved", "published", "active", "resolved"
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

AnswerSchema.virtual("funds", {
  ref: "Fund",
  localField: "cid",
  foreignField: "ipfsCid",
});

AnswerSchema.virtual("topic", {
  ref: "Topic",
  localField: "topicCid",
  foreignField: "cid",
});

AnswerSchema.index({ cid: 1 }, { unique: true });
AnswerSchema.index({ topicCid: 1 });

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
