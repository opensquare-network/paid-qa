const mongoose = require("mongoose");
const {
  RequireOnChainStatus,
  RequiredString,
  RequiredNumber,
} = require("./utils");

const AppendantSchema = new mongoose.Schema(
  {
    indexer: {
      blockHash: RequiredString,
      blockHeight: RequiredNumber,
      extrinsicIndex: RequiredNumber,
      blockTime: RequiredNumber,
    },
    network: RequiredString,
    content: String,
    topicCid: RequiredString,
    cid: RequiredString,
    status: RequireOnChainStatus,
    signer: RequiredString,
    data: Object,
    pinned: Boolean,
    parsed: Boolean,
  },
  {
    timestamps: true,
  }
);

AppendantSchema.index({ cid: 1 }, { unique: true });
AppendantSchema.index(
  { "indexer.blockHash": 1, "indexer.extrinsicIndex": 1 },
  { unique: true }
);
AppendantSchema.index({ topicCid: 1 });

const Appendant = mongoose.model("Appendant", AppendantSchema);

module.exports = Appendant;
