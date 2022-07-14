const { Schema } = require("mongoose");
const { OnChainStatus } = require("../utils/constants");

const RequireOnChainStatus = {
  type: String,
  enum: [OnChainStatus.Reserved, OnChainStatus.Published],
  required: true,
};

const RequiredString = {
  type: String,
  required: true,
};

const RequiredNumber = {
  type: Number,
  required: true,
};

const RequiredDecimal128 = {
  type: Schema.Types.Decimal128,
  required: true,
  get: (v) => v?.toString(),
};

const RequiredRefCidType = {
  type: String,
  enum: ["topic", "answer"],
  required: true,
};

module.exports = {
  RequireOnChainStatus,
  RequiredString,
  RequiredNumber,
  RequiredDecimal128,
  RequiredRefCidType,
};
