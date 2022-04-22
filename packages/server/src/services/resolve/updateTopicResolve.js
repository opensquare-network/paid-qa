const { Topic, Resolve, Reward, Notification } = require("../../models");
const { isSamePublicKey, toPublicKey } = require("../../utils/address");
const { PostStatus } = require("../../utils/constants");
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

  await Topic.updateOne(
    { cid: topicCid },
    { status: allResolved ? PostStatus.Resolved : PostStatus.Active }
  );

  if (allResolved) {
    const topic = await Topic.findOne({ cid: topicCid }).populate("rewards");
    const sponsors = uniq(
      topic?.rewards?.map((reward) => toPublicKey(reward.sponsor)) || []
    );

    // Create notification for all sponsors when topic is resolved
    if (sponsors.length > 0) {
      await Notification.create(
        sponsors.map((sponsor) => ({
          owner: sponsor,
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
