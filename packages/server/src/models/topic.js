const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  // Indexer will be set by the scanner
  indexer: {
    network: String,
    blockHeight: Number,
    blockTime: Number,
    extrinsicIndex: Number,
  },
  network: String,
  title: String,
  content: String,
  language: String,
  cid: String,
  status: String, // "reserved", "published", "onchain", "closed"
  data: Object,
  address: String,
  signature: String,
}, {
  timestamps: true,
});

TopicSchema.virtual("rewards", {
  ref: "Reward",
  localField: "cid",
  foreignField: "topicCid",
});

TopicSchema.index({ cid: 1 }, { unique: true });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
