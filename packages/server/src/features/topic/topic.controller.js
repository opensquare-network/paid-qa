const { extractPage } = require("../../utils/pagination");
const topicService = require("../../services/topic");
const { HttpError } = require("../../utils/exc");

async function getTopics(ctx) {
  const { page, pageSize } = extractPage(ctx);
  const { symbol, status, title } = ctx.request.query;

  ctx.body = await topicService.getTopics(
    symbol,
    status,
    title,
    page,
    pageSize
  );
}

async function getTopic(ctx) {
  const { cid } = ctx.params;

  if (!cid) {
    throw new HttpError(400, { cid: ["Cid is missing"] });
  }

  ctx.body = await topicService.getTopic(cid);
}

async function createTopic(ctx) {
  const {
    data,
    network,
    blockHash,
    blockHeight,
    extrinsicIndex,
    blockTime,
    bounty,
    signer,
  } = ctx.request.body;

  if (!data) {
    throw new HttpError(400, { data: ["Data is missing"] });
  }

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!blockHash) {
    throw new HttpError(400, { blockHash: ["Block hash is missing"] });
  }

  if (!blockHeight) {
    throw new HttpError(400, { blockHeight: ["blockHeight is missing"] });
  }

  if (extrinsicIndex === undefined) {
    throw new HttpError(400, {
      extrinsicIndex: ["Extrinsic index is missing"],
    });
  }

  if (!blockTime) {
    throw new HttpError(400, { blockTime: ["blockTime is missing"] });
  }

  const { title, content } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  const { tokenIdentifier, value, symbol, decimals } = bounty;

  if (!tokenIdentifier) {
    throw new HttpError(400, {
      tokenIdentifier: ["tokenIdentifier is missing"],
    });
  }

  if (!value) {
    throw new HttpError(400, { value: ["value is missing"] });
  }

  if (!symbol) {
    throw new HttpError(400, { symbol: ["symbol is missing"] });
  }

  if (!decimals) {
    throw new HttpError(400, { decimals: ["decimals is missing"] });
  }

  if (!signer) {
    throw new HttpError(400, { signer: ["signer is missing"] });
  }

  ctx.body = await topicService.createTopic(
    data,
    network,
    blockHash,
    extrinsicIndex,
    blockHeight,
    blockTime,
    bounty,
    signer
  );
}

async function addAppendant(ctx) {
  const {
    data,
    network,
    blockHash,
    blockHeight,
    extrinsicIndex,
    blockTime,
    signer,
  } = ctx.request.body;

  if (!data) {
    throw new HttpError(400, { title: ["Data is missing"] });
  }

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!blockHash) {
    throw new HttpError(400, { network: ["Block hash is missing"] });
  }

  if (!blockHeight) {
    throw new HttpError(400, { blockHeight: ["blockHeight is missing"] });
  }

  if (extrinsicIndex === undefined) {
    throw new HttpError(400, { network: ["Extrinsic index is missing"] });
  }

  if (!blockTime) {
    throw new HttpError(400, { blockTime: ["blockTime is missing"] });
  }

  const { topic, content } = data;

  if (!topic) {
    throw new HttpError(400, { topic: ["Topic cid is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!signer) {
    throw new HttpError(400, { signer: ["signer is missing"] });
  }

  ctx.body = await topicService.addAppendant(
    data,
    network,
    blockHash,
    extrinsicIndex,
    blockHeight,
    blockTime,
    signer
  );
}

module.exports = {
  getTopic,
  getTopics,
  createTopic,
  addAppendant,
};
