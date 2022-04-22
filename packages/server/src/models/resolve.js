const mongoose = require("mongoose");

const ResolveSchema = new mongoose.Schema(
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
    topicCid: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    sponsor: {
      type: String,
      required: true,
    },
    sponsorPublicKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ResolveSchema.index({ topicCid: 1, sponsorPublicKey: 1 }, { unique: true });

const Resolve = mongoose.model("Resolve", ResolveSchema);

module.exports = Resolve;
