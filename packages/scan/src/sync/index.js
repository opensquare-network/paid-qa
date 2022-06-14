const dotenv = require("dotenv");
dotenv.config();

const syncTopics = require("./syncTopics");
const syncAppendants = require("./syncAppendants");
const syncAnswers = require("./syncAnswers");
const syncResolves = require("./syncResolves");

async function main() {
  console.log("Sync scan db to business", new Date());
  await syncTopics();
  await syncAppendants();
  await syncAnswers();
  await syncRewards();
  await syncFunds();
  await syncResolves();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
