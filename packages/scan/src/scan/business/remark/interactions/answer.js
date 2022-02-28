const { insertAnswer } = require("../../../../mongo/service/answer");

async function handleAnswer(interaction, caller, indexer) {
  // todo: 1. get the content of answer entity from ipfs
  // todo: 2. valid the signature
  // todo: 3. save the topicIpfsCid and answer related object and content to DB
  // todo: we do the upper tasks in a background worker

  await insertAnswer({
    caller,
    answerIpfsCid: interaction.answerIpfsCid,
    parsed: false,
    indexer,
  });
}

module.exports = {
  handleAnswer,
}
