const topicService = require("../../services/topic.service");
const { RewardCurrencyType } = require("../../utils/constants");

async function getTopics(ctx) {
  ctx.body = {};
}

async function getTopic(ctx) {
  ctx.body = {};
}

async function createTopic(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
    title,
    content,
    language,
    network,
    rewardCurrencyType,
    value,
    assetId,
    symbol,
  } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!language) {
    throw new HttpError(400, { language: ["Language is missing"] });
  }

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!rewardCurrencyType) {
    throw new HttpError(400, { rewardCurrencyType: ["Reward currency type is missing"] });
  }

  if (Object.values(RewardCurrencyType).includes(rewardCurrencyType)) {
    throw new HttpError(400, { rewardCurrencyType: ["Unknown reward currency type"] });
  }

  if (rewardCurrencyType === RewardCurrencyType.Asset && !assetId) {
    throw new HttpError(400, { assetId: ["Asset id is missing"] });
  }

  if (!symbol) {
    throw new HttpError(400, { symbol: ["Symbol is missing"] });
  }

  if (!value) {
    throw new HttpError(400, { value: ["Value is missing"] });
  }

  ctx.body = await topicService.createTopic(
    title,
    content,
    language,
    network,
    rewardCurrencyType,
    assetId,
    symbol,
    value,
    data,
    address,
    signature,
  );
}

module.exports = {
  getTopic,
  getTopics,
  createTopic,
};
