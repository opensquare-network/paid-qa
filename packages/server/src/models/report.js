const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    refCid: {
      type: String,
      required: true,
    },
    offTopic: Boolean,
    inappropriate: Boolean,
    spam: Boolean,
    duplicate: Boolean,
    somethingElse: Boolean,
    data: {
      type: Object,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    signer: {
      type: String,
      required: true,
    },
    signature: {
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
  }
);

ReportSchema.index({ refCid: 1, signerPublicKey: 1 }, { unique: true });

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
