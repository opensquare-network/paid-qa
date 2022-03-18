const { Topic, Answer } = require("../models");
const { HttpError } = require("../utils/exc");
const { isValidSignature } = require("../utils/signature");
const { PostStatus } = require("../utils/constants");
const { cidOf } = require("./ipfs.service");

async function postAnswer(data) {
  const {
    answer,
    address: signer,
    signature,
  } = data;
  const { topic: topicCid, content } = answer;

  // Check signature
  const msg = JSON.stringify(answer);
  const isValid = isValidSignature(msg, signature, signer);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  const cid = await cidOf(data);

  await Answer.create(
    {
      cid,
      topicCid,
      content,
      network: topic.network,
      signer,
      signature,
      pinned: false,
      status: PostStatus.Reserved,
    }
  );

  return {
    cid,
  };
}

async function getAnswers(topicCid, page, pageSize) {
  const q = { topicCid };
  const total = await Answer.countDocuments(q);
  const answers = await Answer.find(q)
    .sort({ createdAt: -1 })
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
