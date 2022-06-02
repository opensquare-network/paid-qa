const {
  Topic,
  Resolve,
  Reward,
  Notification,
} = require("@paid-qa/backend-common/src/models");
const {
  isSamePublicKey,
} = require("@paid-qa/backend-common/src/utils/address");
const uniq = require("lodash.uniq");

async function updateTopicResolve(topicCid) {
  const rewards = await Reward.find({ topicCid });
  const resolves = await Resolve.find({ topicCid });

  const allResolved = !rewards.some(
    (reward) =>
      !resolves.some((resolve) =>
        isSamePublicKey(reward.sponsor, resolve.sponsor)
      )
  );

  await Topic.updateOne({ cid: topicCid }, { resolved: allResolved });

  if (allResolved) {
    const topic = await Topic.findOne({ cid: topicCid })
      .populate("rewards")
      .populate("answers");
    const sponsors =
      topic?.rewards?.map((reward) => reward.sponsorPublicKey) || [];
    const answerers =
      topic?.answers?.map((answer) => answer.signerPublicKey) || [];
    const notified = uniq([...sponsors, ...answerers]);

    // Create notification for participants when topic is resolved
    if (notified.length > 0) {
      await Notification.create(
        notified.map((publicKey) => ({
          owner: publicKey,
          type: ["topicResolved"],
          data: {
            topic: topic._id,
          },
        }))
      );
    }
  }
}

module.exports = updateTopicResolve;
