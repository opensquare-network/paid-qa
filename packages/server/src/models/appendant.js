const mongoose = require("mongoose");

const AppendantSchema = new mongoose.Schema(
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
    network: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    topicCid: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

AppendantSchema.index({ topicCid: 1, cid: 1 }, { unique: true });

const Appendant = mongoose.model("Appendant", AppendantSchema);

module.exports = Appendant;
