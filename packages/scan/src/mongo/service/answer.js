const { getAnswerCollection } = require("../index");

async function insertAnswer(answer) {
  const col = await getAnswerCollection()
  const maybeInDb = await col.findOne({ answerIpfsCid: answer.answerIpfsCid });
  if (maybeInDb) {
    return
  }

  await col.insertOne(answer);
}

module.exports = {
  insertAnswer,
}
