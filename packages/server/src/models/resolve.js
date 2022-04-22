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
  },
  {
    timestamps: true,
  }
);

ResolveSchema.index({ topicCid: 1 });

const Resolve = mongoose.model("Resolve", ResolveSchema);

module.exports = Resolve;
