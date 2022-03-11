const Hash = require("ipfs-only-hash");
const { Topic, Answer } = require("../models");
const HttpError = require("../utils/exc");
const { isValidSignature } = require("../utils/signature");
const { PostStatus } = require("../utils/constants");

async function postAnswer(data) {
  const {
    answer: { topic: topicCid, content },
    address: signer,
    signature,
  } = data;

  // Check signature
  const msg = JSON.stringify(data);
  const isValid = isValidSignature(msg, signature, signer);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(500, "Topic does not exist");
  }

  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);

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

module.exports = {
  postAnswer,
};
