const omit = require("lodash.omit");
const { Fund: BusinessFund } = require("@paid-qa/backend-common/src/models");
const { Fund, Answer } = require("@paid-qa/backend-common/src/models/scan");

async function syncFund(fund) {
  await BusinessFund.updateOne(
    {
      "indexer.blockHash": fund.indexer.blockHash,
      "indexer.extrinsicIndex": fund.indexer.extrinsicIndex,
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

  await Fund.updateOne({ _id: fund._id }, { synced: true });
}

async function syncFunds() {
  const funds = await Fund.find({ parsed: true, synced: { $ne: true } });
  console.log(`Syncing ${funds.length} funds`);

  const topicCids = [];

  for (const fund of funds) {
    if (fund.refCidType === "topic") {
      topicCids.push([fund.refCid, fund.sponsorPublicKey]);
    } else if (fund.refCidType === "answer") {
      const answer = await Answer.findOne({ cid: fund.refCid });
      if (answer) {
        topicCids.push([answer.topicCid, fund.sponsorPublicKey]);
      }
    }

    console.log(`Syncing fund ${fund.refCid}`);
    await syncFund(fund);
  }

  return topicCids;
}

module.exports = syncFunds;
