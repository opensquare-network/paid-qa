const mongoose = require("mongoose");
const { RequiredString } = require("../utils");

const StatusSchema = new mongoose.Schema(
  {
    name: RequiredString,
    value: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

StatusSchema.index({ name: 1 }, { unique: true });

module.exports = { StatusSchema };
