const { Notification } = require("../../models");
const { toPublicKey } = require("../../utils/address");

async function getDiscussionNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    owner: publicKey,
    $or: [{ type: "reply" }, { type: "mention" }, { type: "topicResolved" }],
  };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("data.topic")
    .populate("data.answer");
  return {
    items: notifications,
    page,
    pageSize,
    total,
  };
}

module.exports = getDiscussionNotifications;
