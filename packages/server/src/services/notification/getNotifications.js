const { Notification } = require("../../models");
const { toPublicKey } = require("../../utils/address");

async function getNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = { publicKey };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("data.topic")
    .populate("data.answer")
    .populate("data.support")
    .populate("data.fund");
  return {
    items: notifications,
    page,
    pageSize,
    total,
  };
}

module.exports = getNotifications;
