const mongoose = require("mongoose");

const ResolveSchema = new mongoose.Schema(
  {
    blockHash: String,
    extrinsicIndex: Number,
    blockTime: Number,
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
