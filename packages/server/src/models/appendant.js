const mongoose = require("mongoose");
const {
  RequiredPostStatus,
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
    content: RequiredString,
    data: {
      type: Object,
      required: true,
    },
    topicCid: RequiredString,
    cid: RequiredString,
    pinned: {
      type: Boolean,
      default: false,
    },
    status: RequiredPostStatus,
    signer: RequiredString,
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
