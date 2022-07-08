const { Answer } = require("@paid-qa/backend-common/src/models/scan");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
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

  /**
   * FIXME: we should check the signature validity before update the data to database.
   *  We may need set a field to mark the invalidity, then we don't have to sync it to business database.
   */
  const {
    answer: { topic, content } = {},
    address,
    network,
    signature,
  } = answerData;

  const msg = JSON.stringify({ topic, content });
  const isValid = await isValidSignature(msg, signature, address);
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
