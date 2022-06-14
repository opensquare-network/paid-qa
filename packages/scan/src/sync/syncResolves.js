const omit = require("lodash.omit");
const {
  Resolve: BusinessResolve,
} = require("@paid-qa/backend-common/src/models");
const { Resolve } = require("@paid-qa/backend-common/src/models/scan");

async function syncResolve(resolve) {
  await BusinessResolve.updateOne(
    {
      indexer: resolve.indexer,
      refCid: resolve.refCid,
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
}

async function syncResolves() {
  const resolves = await Resolve.find({ parsed: true, synced: false });
  console.log(`Syncing ${resolves.length} resolves`);
  for (const resolve of resolves) {
    console.log(`Syncing resolve ${resolve.cid}`);
    await syncResolve(resolve);
  }
}

module.exports = syncResolves;
