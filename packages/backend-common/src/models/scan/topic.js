const mongoose = require("mongoose");
const {
  RequiredString,
  RequiredNumber,
  RequiredDecimal128,
} = require("../utils");

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
    title: String,
    content: String,
    bounty: {
      tokenIdentifier: RequiredString,
      symbol: RequiredString,
      decimals: RequiredNumber,
      value: RequiredDecimal128,
    },
    resolved: Boolean,
    signer: RequiredString,
    signerPublicKey: RequiredString,
    data: Object, // raw data submitted by the user, should be pinned to IPFS
    parsed: Boolean, // indicates whether the ipfs content has been parsed by scan-worker
    synced: Boolean,
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

module.exports = { TopicSchema };
