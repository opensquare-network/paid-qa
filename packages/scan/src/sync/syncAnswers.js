const omit = require("lodash.omit");
const {
  Answer: BusinessAnswer,
} = require("@paid-qa/backend-common/src/models");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");

async function syncAnswer(answer) {
  await BusinessAnswer.updateOne(
    {
      indexer: answer.indexer,
      cid: answer.cid,
    },
    {
      ...omit(answer.toJSON(), [
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

async function syncAnswers() {
  const answers = await Answer.find({ parsed: true, synced: false });
  console.log(`Syncing ${answers.length} answers`);
  for (const answer of answers) {
    console.log(`Syncing answer ${answer.cid}`);
    await syncAnswer(answer);
  }
}

module.exports = syncAnswers;
