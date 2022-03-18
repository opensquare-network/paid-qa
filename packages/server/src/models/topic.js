const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    blockTime: Number,
    network: String,
    title: String,
    content: String,
    language: String,
    data: Object,
    cid: String,
    pinned: {
      type: Boolean,
      default: false,
    },
    status: String, // "published", "active", "resolved"
    signer: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

TopicSchema.virtual("rewards", {
  ref: "Reward",
  localField: "cid",
  foreignField: "topicCid",
});

TopicSchema.virtual("funds", {
  ref: "Fund",
  localField: "cid",
  foreignField: "ipfsCid",
});

TopicSchema.virtual("appendants", {
  ref: "Appendant",
  localField: "cid",
  foreignField: "topicCid",
  match: (topic) => ({ signer: topic.signer }),
});

TopicSchema.virtual("answers", {
  ref: "Answer",
  localField: "cid",
  foreignField: "topicCid",
});

TopicSchema.virtual("answersCount", {
  ref: "Answer",
  localField: "cid",
  foreignField: "topicCid",
  count: true,
});

TopicSchema.index({ cid: 1 }, { unique: true });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
