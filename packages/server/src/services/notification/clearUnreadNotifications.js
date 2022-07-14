const mongoose = require("mongoose");
const { Notification } = require("@paid-qa/backend-common/src/models");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function clearUnreadNotifications(network, address, items) {
  const publicKey = toPublicKey(address);
  const q = {
    owner: publicKey,
    read: false,
  };

  if (Array.isArray(items)) {
    q._id = { $in: items.map(mongoose.Types.ObjectId) };
  }

  const result = await Notification.updateMany(q, { read: true });
  return {
    result,
  };
}

module.exports = clearUnreadNotifications;
