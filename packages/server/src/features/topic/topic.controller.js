const { extractPage } = require("../../utils/pagination");
const topicService = require("../../services/topic.service");
const { RewardCurrencyType } = require("../../utils/constants");

async function getTopics(ctx) {
  const { page, pageSize } = extractPage(ctx.query);

  ctx.body = await topicService.getTopics(page, pageSize);
}

async function getTopic(ctx) {
  const { cid } = ctx.query;

  if (!cid) {
    throw new HttpError(400, { cid: ["Cid is missing"] });
  }

  ctx.body = await topicService.getTopic(cid);
}

async function createTopic(ctx) {
  const { data, network, blockHash, extrinsicHash } = ctx.request.body;

  if (!data) {
    throw new HttpError(400, { title: ["Data is missing"] });
  }

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!blockHash) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!extrinsicHash) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  const { title, content, language } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!language) {
    throw new HttpError(400, { language: ["Language is missing"] });
  }

  ctx.body = await topicService.createTopic(
    title,
    content,
    language,
    data,
    network,
    blockHash,
    extrinsicHash
  );
}

module.exports = {
  getTopic,
  getTopics,
  createTopic,
};
