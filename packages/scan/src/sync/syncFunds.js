const omit = require("lodash.omit");
const { Fund: BusinessFund } = require("@paid-qa/backend-common/src/models");
const { Fund } = require("@paid-qa/backend-common/src/models/scan");

async function syncFund(fund) {
  await BusinessFund.updateOne(
    {
      indexer: fund.indexer,
      refCid: fund.refCid,
    },
    {
      ...omit(fund.toJSON(), [
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

async function syncFunds() {
  const funds = await Fund.find({ parsed: true, synced: false });
  console.log(`Syncing ${funds.length} funds`);
  for (const fund of funds) {
    console.log(`Syncing fund ${fund.cid}`);
    await syncFund(fund);
  }
}

module.exports = syncFunds;
