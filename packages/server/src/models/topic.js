const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  cid: String,
  status: String, // "reserved", "published", "onchain", "closed"
  data: String,
  address: String,
  signature: String,
}, {
  timestamps: true,
});

TopicSchema.index({ cid: 1 }, { unique: true });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
