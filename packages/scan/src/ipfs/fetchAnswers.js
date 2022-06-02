const { Answer } = require("@paid-qa/backend-common/src/models");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");
const { fetchIpfsJson } = require("./utils");

async function fetchAnswer(answer) {
  const answerIpfsCid = answer.cid;

  const answerData = await fetchIpfsJson(answerIpfsCid);
  if (!answerData) {
    return;
  }

  const {
    answer: { topic, content } = {},
    address,
    network,
    signature,
  } = answerData;

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
  const answers = await Answer.find({ parsed: false });
  console.log(`Fetching ${answers.length} answers`);
  for (const answer of answers) {
    console.log(`Fetching answer ${answer.cid}`);
    await fetchAnswer(answer);
  }
}

module.exports = fetchAnswers;
