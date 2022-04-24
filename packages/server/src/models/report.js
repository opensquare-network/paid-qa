const mongoose = require("mongoose");
const { RequiredRefCid, RequiredString } = require("./utils");

const ReportSchema = new mongoose.Schema(
  {
    refCid: RequiredRefCid,
    offTopic: Boolean,
    inappropriate: Boolean,
    spam: Boolean,
    duplicate: Boolean,
    somethingElse: Boolean,
    data: {
      type: Object,
      required: true,
    },
    network: RequiredString,
    signer: RequiredString,
    signature: RequiredString,
    signerPublicKey: RequiredString,
  },
  {
    timestamps: true,
  }
);

ReportSchema.index({ refCid: 1, signerPublicKey: 1 }, { unique: true });

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
