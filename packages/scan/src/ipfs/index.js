const dotenv = require("dotenv");
dotenv.config();

const fetchAppendants = require("./fetchAppendents");
const fetchTopics = require("./fetchTopics");
const fetchAnswers = require("./fetchAnswers");

async function main() {
  console.log("Fetch ipfs content at", new Date());

  await Promise.all([
    ...(await fetchTopics()),
    ...(await fetchAppendants()),
    ...(await fetchAnswers()),
  ]);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
