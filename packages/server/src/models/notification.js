const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    owner: String, // public key of owner address
    type: [String], // reply, mention, fund, resolve
    data: {
      answer: {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
      topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
      fund: {
        type: Schema.Types.ObjectId,
        ref: "Fund",
      },
      who: {
        address: String,
        network: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

NotificationSchema.index({ owner: 1 });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
