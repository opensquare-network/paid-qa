const { Notification } = require("../models");
const { toPublicKey } = require("../utils/address");

async function getNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = { publicKey };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return {
    items: notifications,
    page,
    pageSize,
    total,
  };
}

async function getDiscussionNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    $or: [{ type: "reply" }, { type: "mention" }],
  };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return {
    items: notifications,
    page,
    pageSize,
    total,
  };
}

async function getRewardNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    type: "fund",
  };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return {
    items: notifications,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getNotifications,
  getDiscussionNotifications,
  getRewardNotifications,
};
