const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    refCid: String,
    offTopic: Boolean,
    inappropriate: Boolean,
    spam: Boolean,
    duplicate: Boolean,
    somethingElse: Boolean,
    data: Object,
    network: String,
    signer: String,
    signature: String,
    signerPublicKey: String,
  },
  {
    timestamps: true,
  }
);

ReportSchema.index({ ipfsCid: 1, signerPublicKey: 1 }, { unique: true });

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
