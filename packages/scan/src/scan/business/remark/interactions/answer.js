const { insertAnswer } = require("../../../../mongo/service/answer");

async function handleAnswer(interaction, caller, indexer) {
  const cid = interaction.answerIpfsCid
  // todo: 1. get the content of answer entity from ipfs
  // todo: 2. valid the signature
  // todo: 3. save the topicIpfsCid and answer related object and content to DB

  await insertAnswer();
}

module.exports = {
  handleAnswer,
}
