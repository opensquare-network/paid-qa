const mongoose = require("mongoose");
const { Schema } = require("mongodb");

const PromiseSchema = new mongoose.Schema({
  topicCid: String,
  value: Schema.Types.Decimal128,
  symbol: String,
  sponsor: String,
}, {
  timestamps: true,
});

PromiseSchema.index({ topicCid: 1 });

const Promise = mongoose.model("Promise", PromiseSchema);

module.exports = Promise;
