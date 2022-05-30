const mongoose = require("mongoose");
const { RequiredDecimal128, RequiredString } = require("./utils");

const FulfillSchema = new mongoose.Schema(
  {
    topicCid: RequiredString,
    sponsorPublicKey: RequiredString,
    symbol: RequiredString,
    promised: RequiredDecimal128,
    funded: RequiredDecimal128,
    fulfilled: Boolean,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

FulfillSchema.index({ topicCid: 1 });
FulfillSchema.index({ sponsorPublicKey: 1 });

const Fulfill = mongoose.model("Fulfill", FulfillSchema);

module.exports = Fulfill;
