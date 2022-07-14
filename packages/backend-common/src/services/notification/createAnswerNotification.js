const { Topic, Notification } = require("../../models");
const { isSamePublicKey, toPublicKey } = require("../../utils/address");
const { extractMentions } = require("../../utils/mention");

async function createAnswerNotification(answer) {
  const topic = await Topic.findOne({ cid: answer.topicCid });
  if (!topic) {
    return;
  }

  if (!isSamePublicKey(topic.signer, answer.signer)) {
    const owner = toPublicKey(topic.signer);
    await Notification.create({
      owner,
      type: ["reply"],
      data: {
        topic: topic._id,
        answer: answer._id,
        byWho: {
          address: answer.signer,
          network: answer.network,
        },
      },
    });
  }

  const mentions = extractMentions(answer.content);
  for (const mention of mentions) {
    const owner = toPublicKey(mention.address);
    await Notification.updateOne(
      {
        owner,
        "data.topic": topic._id,
        "data.answer": answer._id,
      },
      {
        $addToSet: {
          type: "mention",
        },
        $set: {
          "data.byWho": {
            address: answer.signer,
            network: answer.network,
          },
        },
      },
      { upsert: true }
    );
  }
}

module.exports = {
  createAnswerNotification,
};
