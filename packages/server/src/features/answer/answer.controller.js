const answerService = require("../../services/answer.service");

async function getAnswers(ctx) {
  ctx.body = {};
}

async function postAnswer(ctx) {
  const {
    answer: { topic, content } = {},
    address,
    signature,
  } = data;

  if (!topic) {
    throw new HttpError(400, "Topic is missing");
  }

  if (!content) {
    throw new HttpError(400, "Content is missing");
  }

  if (!address) {
    throw new HttpError(400, "Address is missing");
  }

  if (!signature) {
    throw new HttpError(400, "Signature is missing");
  }

  ctx.body = await answerService.postAnswer(data);
}

module.exports = {
  getAnswers,
  postAnswer,
};
