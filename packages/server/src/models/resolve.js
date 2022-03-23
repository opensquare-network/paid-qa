const mongoose = require("mongoose");

const ResolveSchema = new mongoose.Schema(
  {
    blockTime: String,
    topicCid: String,
    network: String,
    sponsor: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

ResolveSchema.index({ topicCid: 1 });

const Resolve = mongoose.model("Resolve", ResolveSchema);

module.exports = Resolve;
