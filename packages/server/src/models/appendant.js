const mongoose = require("mongoose");

const AppendantSchema = new mongoose.Schema(
  {
    blockTime: Number,
    network: String,
    content: String,
    data: Object,
    topicCid: String,
    cid: String,
    pinned: {
      type: Boolean,
      default: false,
    },
    status: String, // "published", "active", "resolved"
    signer: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

AppendantSchema.index({ cid: 1 }, { unique: true });
AppendantSchema.index({ topicCid: 1 });

const Appendant = mongoose.model("Appendant", AppendantSchema);

module.exports = Appendant;
