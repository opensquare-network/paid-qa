const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    owner: String, // public key of owner address
    type: [String], // reply, mention, support, fund, topicResolved
    read: {
      type: Boolean,
      default: false,
    },
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
      byWho: {
        address: String,
        network: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.index({ owner: 1, read: 1 });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
