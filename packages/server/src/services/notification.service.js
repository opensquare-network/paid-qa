const { Notification } = require("../models");
const { toPublicKey } = require("../utils/address");

async function getNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = { publicKey };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
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

async function getDiscussionNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    $or: [{ type: "reply" }, { type: "mention" }, { type: "topicResolved" }],
  };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
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

async function getRewardNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    $or: [{ type: "fund" }, { type: "support" }],
  };
  const total = await Notification.countDocuments(q);
  const notifications = await Notification.find(q)
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

async function getUnreadNotifications(network, address) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    read: false,
  };
  const count = await Notification.countDocuments(q);
  return {
    count,
  };
}

async function clearUnreadNotifications(network, address) {
  const publicKey = toPublicKey(address);
  const q = {
    publicKey,
    read: false,
  };
  const result = await Notification.updateMany(q, { read: true });
  return {
    result,
  };
}

module.exports = {
  getNotifications,
  getDiscussionNotifications,
  getRewardNotifications,
  getUnreadNotifications,
  clearUnreadNotifications,
};
