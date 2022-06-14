const omit = require("lodash.omit");
const {
  Appendant: BusinessAppendant,
} = require("@paid-qa/backend-common/src/models");
const { Appendant } = require("@paid-qa/backend-common/src/models/scan");

async function syncAppendant(appendant) {
  await BusinessAppendant.updateOne(
    {
      indexer: appendant.indexer,
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
      ]),
      pinned: true,
    },
    { upsert: true }
  );
}

async function syncAppendants() {
  const appendants = await Appendant.find({ parsed: true, synced: false });
  console.log(`Syncing ${appendants.length} appendants`);
  for (const appendant of appendants) {
    console.log(`Syncing appendant ${appendant.cid}`);
    await syncAppendant(appendant);
  }
}

module.exports = syncAppendants;
