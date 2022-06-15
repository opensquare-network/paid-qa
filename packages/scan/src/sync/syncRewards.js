const omit = require("lodash.omit");
const {
  Reward: BusinessReward,
} = require("@paid-qa/backend-common/src/models");
const { Reward } = require("@paid-qa/backend-common/src/models/scan");

async function syncReward(reward) {
  await BusinessReward.updateOne(
    {
      "indexer.blockHash": reward.indexer.blockHash,
      "indexer.extrinsicIndex": reward.indexer.extrinsicIndex,
      topicCid: reward.topicCid,
    },
    {
      ...omit(reward.toJSON(), [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "synced",
      ]),
    },
    { upsert: true }
  );

  await Reward.updateOne({ _id: reward._id }, { synced: true });
}

async function syncRewards() {
  const rewards = await Reward.find({ synced: { $ne: true } });
  console.log(`Syncing ${rewards.length} rewards`);
  for (const reward of rewards) {
    console.log(`Syncing reward ${reward.topicCid}`);
    await syncReward(reward);
  }

  return rewards.map((item) => [item.topicCid, item.sponsorPublicKey]);
}

module.exports = syncRewards;
