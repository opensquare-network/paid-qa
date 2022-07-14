const { Topic, Notification } = require("../../models");
const { toPublicKey } = require("../../utils/address");

async function createSupportNotification(support) {
  const topic = await Topic.findOne({ cid: support.topicCid });
  if (!topic) {
    return;
  }

  const owner = toPublicKey(topic.signer);
  await Notification.create({
    owner,
    type: ["support"],
    data: {
      topic: topic._id,
      support: support._id,
      byWho: {
        address: support.sponsor,
        network: support.network,
      },
    },
  });
}

module.exports = {
  createSupportNotification,
};
