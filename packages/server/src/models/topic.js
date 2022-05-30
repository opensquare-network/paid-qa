const mongoose = require("mongoose");
const {
  RequireOnChainStatus,
  RequiredString,
  RequiredNumber,
  RequiredDecimal128,
} = require("./utils");

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
    bounty: {
      tokenIdentifier: RequiredString,
      symbol: RequiredString,
      decimals: RequiredNumber,
      value: RequiredDecimal128,
    },
    data: {
      type: Object,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    resolved: Boolean,
    status: RequireOnChainStatus,
    signer: RequiredString,
    signerPublicKey: RequiredString,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
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
TopicSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true }
);
TopicSchema.index({ signerPublicKey: 1 });

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
