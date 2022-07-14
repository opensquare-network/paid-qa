require("dotenv").config();

const { saveKnownHeights } = require("../mongo/known");
const {
  Topic,
  Appendant,
  Fund,
  Reward,
  Answer,
  Resolve,
} = require("@paid-qa/backend-common/src/models/scan");

async function main() {
  const topics = await Topic.find({});
  let heights = (topics || []).map((topic) => topic.indexer.blockHeight);
  await saveKnownHeights(heights);

  const appendants = await Appendant.find({});
  heights = (appendants || []).map((item) => item.indexer.blockHeight);
  await saveKnownHeights(heights);

  const funds = await Fund.find({});
  heights = (funds || []).map((item) => item.indexer.blockHeight);
  await saveKnownHeights(heights);

  const rewards = await Reward.find({});
  heights = (rewards || []).map((item) => item.indexer.blockHeight);
  await saveKnownHeights(heights);

  const answers = await Answer.find({});
  heights = (answers || []).map((topic) => topic.indexer.blockHeight);
  await saveKnownHeights(heights);

  const resolves = await Resolve.find({});
  heights = (resolves || []).map((topic) => topic.indexer.blockHeight);
  await saveKnownHeights(heights);

  process.exit(0);
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
