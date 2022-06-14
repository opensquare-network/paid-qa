const omit = require("lodash.omit");
const {
  Reward: BusinessReward,
} = require("@paid-qa/backend-common/src/models");
const { Reward } = require("@paid-qa/backend-common/src/models/scan");

async function syncReward(reward) {
  await BusinessReward.updateOne(
    {
      indexer: reward.indexer,
      refCid: reward.refCid,
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
}

async function syncRewards() {
  const rewards = await Reward.find({ synced: false });
  console.log(`Syncing ${rewards.length} rewards`);
  for (const reward of rewards) {
    console.log(`Syncing reward ${reward.cid}`);
    await syncReward(reward);
  }
}

module.exports = syncRewards;
