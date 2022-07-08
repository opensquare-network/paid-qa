const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const {
  isValidSignature,
} = require("@paid-qa/backend-common/src/utils/signature");
const { fetchIpfsJsonInQueue } = require("./utils");

async function fetchAnswer(answer) {
  const answerIpfsCid = answer.cid;

  const answerData = await fetchIpfsJsonInQueue(answerIpfsCid);
  if (!answerData) {
    await Answer.updateOne(
      { _id: answer._id },
      {
        $inc: { retries: 1 },
        $set: { lastRetryTime: new Date() },
      }
    );
    return;
  }

  const {
    answer: { topic, content } = {},
    address,
    network,
    signature,
  } = answerData;

  const msg = JSON.stringify({ topic, content });
  const isValid = isValidSignature(msg, signature, address);
  if (!isValid) {
    await Answer.updateOne(
      { _id: answer._id },
      { parsed: true, invalid: true }
    );
    return;
  }

  await Answer.updateOne(
    { _id: answer._id },
    {
      signer: address,
      network,
      signerPublicKey: toPublicKey(address),
      signature,
      topicCid: topic,
      content,
      parsed: true,
    }
  );
}

async function fetchAnswers() {
  const answers = await Answer.find({
    parsed: false,
    $or: [{ retries: null }, { retries: { $ne: null, $lt: 20 } }],
  });
  console.log(`Fetching ${answers.length} answers`);

  const promises = [];
  for (const answer of answers) {
    promises.push(fetchAnswer(answer));
  }

  return promises;
}

module.exports = fetchAnswers;
