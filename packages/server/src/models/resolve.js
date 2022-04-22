const mongoose = require("mongoose");

const ResolveSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: String,
      blockHeight: Number,
      extrinsicIndex: Number,
      blockTime: Number,
    },
    topicCid: String,
    network: String,
    sponsor: String,
    sponsorPublicKey: String,
  },
  {
    timestamps: true,
  }
);

ResolveSchema.index({ topicCid: 1, sponsorPublicKey: 1 }, { unique: true });

const Resolve = mongoose.model("Resolve", ResolveSchema);

module.exports = Resolve;
