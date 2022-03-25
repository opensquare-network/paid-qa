const { Topic, Answer, Notification } = require("../models");
const { HttpError } = require("../utils/exc");
const { isValidSignature } = require("../utils/signature");
const { PostStatus } = require("../utils/constants");
const { cidOf } = require("./ipfs.service");
const { extractMentions } = require("../utils/mention");
const { toPublicKey, isSamePublicKey } = require("../utils/address");

async function postAnswer(data) {
  const { answer, address: signer, network, signature } = data;
  const { topic: topicCid, content } = answer;

  // Check signature
  const msg = JSON.stringify(answer);
  const isValid = isValidSignature(msg, signature, signer);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  // Check topic
  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(400, "Topic not found");
  }

  const cid = await cidOf(data);

  const answerObj = await Answer.create({
    cid,
    topicCid,
    content,
    network,
    signer,
    signature,
    pinned: false,
    status: PostStatus.Reserved,
  });

  if (!isSamePublicKey(topic.signer, signer)) {
    const owner = toPublicKey(topic.signer);
    await Notification.create({
      owner,
      type: ["reply"],
      data: {
        topic: topic._id,
        answer: answerObj._id,
        byWho: {
          address: signer,
          network,
        },
      },
    });
  }

  const mentions = extractMentions(content);
  for (const mention of mentions) {
    const owner = toPublicKey(mention.address);
    await Notification.updateOne(
      {
        owner,
        "data.topic": topic._id,
        "data.answer": answerObj._id,
      },
      {
        $addToSet: {
          type: "mention",
        },
        $set: {
          "data.byWho": {
            address: signer,
            network,
          },
        },
      },
      { upsert: true }
    );
  }

  return {
    cid,
  };
}

async function getAnswers(topicCid, page, pageSize) {
  const q = { topicCid };
  const total = await Answer.countDocuments(q);
  const answers = await Answer.find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("funds");

  return {
    items: answers,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAnswers,
  postAnswer,
};
