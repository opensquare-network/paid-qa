const omit = require("lodash.omit");
const {
  Answer: BusinessAnswer,
} = require("@paid-qa/backend-common/src/models");
const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const {
  createAnswerNotification,
} = require("@paid-qa/backend-common/src/services/notification/createAnswerNotification");

async function syncAnswer(answer) {
  const result = await BusinessAnswer.updateOne(
    {
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

  await Answer.updateOne({ _id: answer._id }, { synced: true });

  // Create notification
  if (result.upsertedCount === 0) {
    return;
  }

  const businessAnswer = await BusinessAnswer.findOne({
    cid: answer.cid,
  });

  await createAnswerNotification(businessAnswer);
}

async function syncAnswers() {
  const answers = await Answer.find({ parsed: true, synced: { $ne: true } });
  console.log(`Syncing ${answers.length} answers`);
  for (const answer of answers) {
    console.log(`Syncing answer ${answer.cid}`);
    await syncAnswer(answer);
  }
}

module.exports = syncAnswers;
