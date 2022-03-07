const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    network: String,
    title: String,
    content: String,
    language: String,
    cid: String,
    status: String, // "reserved", "published", "onchain", "closed"
    signer: String,
  },
  {
    timestamps: true,
  }
);

TopicSchema.virtual("rewards", {
  ref: "Reward",
  localField: "cid",
  foreignField: "topicCid",
});

TopicSchema.index({ cid: 1 }, { unique: true });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
