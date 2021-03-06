const { Topic, Answer } = require("@paid-qa/backend-common/src/models");
const {
  isValidSignature,
} = require("@paid-qa/backend-common/src/utils/signature");
const { HttpError } = require("../../utils/exc");
const {
  OnChainStatus,
} = require("@paid-qa/backend-common/src/utils/constants");
const { cidOf } = require("../ipfs.service");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  createAnswerNotification,
} = require("@paid-qa/backend-common/src/services/notification/createAnswerNotification");

async function postAnswer(data) {
  const { answer, address: signer, network, signature } = data;
  const { topic: topicCid, content } = answer;

  // Check signature
  const msg = JSON.stringify(answer);
  const isValid = await isValidSignature(msg, signature, signer);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  // Check topic
  const topic = await Topic.findOne({ cid: topicCid });
  if (!topic) {
    throw new HttpError(400, "Topic not found");
  }

  const cid = await cidOf(data);

  const signerPublicKey = toPublicKey(signer);
  const answerObj = await Answer.create({
    cid,
    topicCid,
    content,
    network,
    signer,
    signerPublicKey,
    signature,
    data,
    pinned: false,
    status: OnChainStatus.Reserved,
  });

  await createAnswerNotification(answerObj);

  return {
    cid,
  };
}

module.exports = postAnswer;
