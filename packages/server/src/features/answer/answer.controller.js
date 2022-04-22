const { extractPage } = require("../../utils/pagination");
const answerService = require("../../services/answer");
const { HttpError } = require("../../utils/exc");

async function getAnswers(ctx) {
  const { topicCid } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  ctx.body = await answerService.getAnswers(topicCid, page, pageSize);
}

async function postAnswer(ctx) {
  const { topicCid } = ctx.params;
  const data = ctx.request.body;
  const {
    answer: { topic, content } = {},
    address,
    network,
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

  if (!network) {
    throw new HttpError(400, "Network is missing");
  }

  if (!signature) {
    throw new HttpError(400, "Signature is missing");
  }

  if (topicCid !== topic) {
    throw new HttpError(400, "Topic doesn't match the url");
  }

  ctx.body = await answerService.postAnswer(data);
}

module.exports = {
  getAnswers,
  postAnswer,
};
