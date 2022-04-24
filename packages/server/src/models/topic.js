const mongoose = require("mongoose");
const { RequiredPostStatus, RequiredString, RequiredNumber } = require("./utils");

const TopicSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    cid: RequiredString,
    network: RequiredString,
    title: RequiredString,
    content: RequiredString,
    language: RequiredString,
    data: {
      type: Object,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    status: RequiredPostStatus,
    signer: RequiredString,
    signerPublicKey: RequiredString,
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
  foreignField: "refCid",
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

TopicSchema.virtual("resolves", {
  ref: "Resolve",
  localField: "cid",
  foreignField: "topicCid",
});

TopicSchema.index({ cid: 1 }, { unique: true });
TopicSchema.index({ signerPublicKey: 1 });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
