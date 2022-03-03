const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  topicCid: String,
  content: String,
  cid: String,
  status: String, // "reserved", "published", "onchain", "closed"
  data: String,
  address: String,
  signature: String,
}, {
  timestamps: true,
});

AnswerSchema.index({ topicCid: 1 });

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
