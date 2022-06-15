const dotenv = require("dotenv");
dotenv.config();

const uniqBy = require("lodash.uniqby");
const syncTopics = require("./syncTopics");
const syncAppendants = require("./syncAppendants");
const syncAnswers = require("./syncAnswers");
const syncResolves = require("./syncResolves");
const syncRewards = require("./syncRewards");
const syncFunds = require("./syncFunds");
const {
  updatePromiseFulfillment,
} = require("@paid-qa/backend-common/src/services/fulfill");
const updateTopicResolve = require("@paid-qa/backend-common/src/services/resolve/updateTopicResolve");

async function main() {
  console.log("Sync scan db to business", new Date());

  await syncTopics();
  await syncAppendants();
  await syncAnswers();

  let fundRewards = [];

  (await syncRewards()).forEach((reward) => fundRewards.push(reward));
  (await syncFunds()).forEach((fund) => fundRewards.push(fund));

  fundRewards = uniqBy(
    fundRewards,
    ([topicCid, sponsorPublicKey]) => `${topicCid}+${sponsorPublicKey}`
  );
  for (const [topicCid, sponsorPublicKey] of fundRewards) {
    await updatePromiseFulfillment(topicCid, sponsorPublicKey);
  }

  let resolves = await syncResolves();
  resolves = uniqBy(resolves);

  for (const topicCid of resolves) {
    await updateTopicResolve(topicCid);
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
