const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const EventEmitter = require("events");
const { RequiredString } = require("./utils");
const { NotificationType } = require("../utils/constants");

const NotificationSchema = new mongoose.Schema(
  {
    owner: RequiredString, // public key of owner address
    type: {
      type: [String],
      enum: [
        NotificationType.Reply,
        NotificationType.Mention,
        NotificationType.Support,
        NotificationType.Fund,
        NotificationType.TopicResolved,
      ],
      required: true,
    },
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
      support: {
        type: Schema.Types.ObjectId,
        ref: "Reward",
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

const eventEmitter = new EventEmitter();

NotificationSchema.post("save", function () {
  eventEmitter.emit("save", this);
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { eventEmitter, Notification };
