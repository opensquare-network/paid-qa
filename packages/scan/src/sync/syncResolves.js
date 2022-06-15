const omit = require("lodash.omit");
const {
  Resolve: BusinessResolve,
} = require("@paid-qa/backend-common/src/models");
const { Resolve } = require("@paid-qa/backend-common/src/models/scan");

async function syncResolve(resolve) {
  await BusinessResolve.updateOne(
    {
      "indexer.blockHash": resolve.indexer.blockHash,
      "indexer.extrinsicIndex": resolve.indexer.extrinsicIndex,
      topicCid: resolve.topicCid,
    },
    {
      ...omit(resolve.toJSON(), [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "synced",
      ]),
    },
    { upsert: true }
  );

  await Resolve.updateOne({ _id: resolve._id }, { synced: true });
}

async function syncResolves() {
  const resolves = await Resolve.find({ parsed: true, synced: { $ne: true } });
  console.log(`Syncing ${resolves.length} resolves`);
  for (const resolve of resolves) {
    console.log(`Syncing resolve ${resolve.topicCid}`);
    await syncResolve(resolve);
  }

  return resolves.map((item) => item.topicCid);
}

module.exports = syncResolves;
