const { Notification } = require("../../models");
const { toPublicKey } = require("../../utils/address");

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

module.exports = clearUnreadNotifications;
