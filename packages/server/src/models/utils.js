const { Schema } = require("mongoose");
const { PostStatus } = require("../utils/constants");

const RequiredPostStatus = {
  type: String,
  enum: [PostStatus.Reserved, PostStatus.Published, PostStatus.Active, PostStatus.Resolved],
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
}

module.exports = {
  RequiredPostStatus,
  RequiredString,
  RequiredNumber,
  RequiredDecimal128,
  RequiredRefCidType,
};
