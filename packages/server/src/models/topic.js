const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: {
        type: String,
        required: true,
      },
      blockHeight: {
        type: Number,
        required: true,
      },
      extrinsicIndex: {
        type: Number,
        required: true,
      },
      blockTime: {
        type: Number,
        required: true,
      },
    },
    cid: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    }, // "published", "active", "resolved"
    signer: {
      type: String,
      required: true,
    },
    signerPublicKey: {
      type: String,
      required: true,
    },
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
