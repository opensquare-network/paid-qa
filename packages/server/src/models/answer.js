const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    network: String,
    topicCid: String,
    content: String,
    signer: String,
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
  }
);

AnswerSchema.index({ cid: 1 }, { unique: true });
AnswerSchema.index({ topicCid: 1 });

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
