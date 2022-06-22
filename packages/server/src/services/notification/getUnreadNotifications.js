const { Notification } = require("@paid-qa/backend-common/src/models");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function getUnreadNotifications(network, address) {
  const publicKey = toPublicKey(address);
  const q = {
    owner: publicKey,
    read: false,
  };
  const count = await Notification.countDocuments(q);
  return {
    count,
  };
}

module.exports = getUnreadNotifications;
