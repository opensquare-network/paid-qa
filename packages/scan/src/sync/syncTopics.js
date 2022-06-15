const omit = require("lodash.omit");
const { Topic: BusinessTopic } = require("@paid-qa/backend-common/src/models");
const { Topic } = require("@paid-qa/backend-common/src/models/scan");

async function syncTopic(topic) {
  await BusinessTopic.updateOne(
    { cid: topic.cid },
    {
      ...omit(topic.toJSON(), [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "parsed",
        "synced",
      ]),
      pinned: true,
    },
    { upsert: true }
  );

  await Topic.updateOne({ _id: topic._id }, { synced: true });
}

async function syncTopics() {
  const topics = await Topic.find({ parsed: true, synced: { $ne: true } });
  console.log(`Syncing ${topics.length} topics`);
  for (const topic of topics) {
    console.log(`Syncing topic ${topic.cid}`);
    await syncTopic(topic);
  }
}

module.exports = syncTopics;
