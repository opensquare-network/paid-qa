const { Notification } = require("@paid-qa/backend-common/src/models");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function getRewardNotifications(network, address, page, pageSize) {
  const publicKey = toPublicKey(address);
  const q = {
    owner: publicKey,
    $or: [{ type: "fund" }, { type: "support" }],
  };
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

module.exports = getRewardNotifications;
