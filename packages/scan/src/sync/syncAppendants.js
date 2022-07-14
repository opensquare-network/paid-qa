const omit = require("lodash.omit");
const {
  Appendant: BusinessAppendant,
} = require("@paid-qa/backend-common/src/models");
const { Appendant } = require("@paid-qa/backend-common/src/models/scan");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");

async function syncAppendant(appendant) {
  await BusinessAppendant.updateOne(
    {
      cid: appendant.cid,
    },
    {
      ...omit(appendant.toJSON(), [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
        "parsed",
        "synced",
        "retries",
        "lastRetryTime",
      ]),
      pinned: true,
      status: OnChainStatus.Published,
    },
    { upsert: true }
  );

  await Appendant.updateOne({ _id: appendant._id }, { synced: true });
}

async function syncAppendants() {
  const appendants = await Appendant.find({
    parsed: true,
    synced: { $ne: true },
  });
  console.log(`Syncing ${appendants.length} appendants`);
  for (const appendant of appendants) {
    console.log(`Syncing appendant ${appendant.cid}`);
    await syncAppendant(appendant);
  }
}

module.exports = syncAppendants;
