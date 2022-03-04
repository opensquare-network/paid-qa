const mongoose = require("mongoose");
const Hash = require("ipfs-only-hash");
const { Topic, Reward} = require("../models");
const { PostStatus } = require("../utils/constants");

async function createTopic(
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
) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);

  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await Topic.create([{
      cid,
      title,
      content,
      language,
      status: PostStatus.Reserved,
      network,
      data,
      address,
      signature,
    }], { session });

    await Reward.create([{
      topicCid: cid,
      network,
      rewardCurrencyType,
      value,
      assetId,
      symbol,
      sponsor: address,
    }], { session });
  });

  return {
    cid,
  };
}

async function setTopicPublished(cid) {
  await Topic.updateOne({ cid }, { status: PostStatus.Published });
  return true;
}

async function deleteTopic(cid) {
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await Topic.deleteOne({ cid }, { session });
    await Reward.deleteMany({ topicCid: cid }, { session });
  });
  return true;
}

async function getTopic(cid) {
  const topic = await Topic.findOne({ cid }).populate("rewards");
  return topic;
}

async function getTopics(page, pageSize) {
  const topics = await Topic
    .find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("rewards");
  return topics;
}

module.exports = {
  createTopic,
  setTopicPublished,
  deleteTopic,
  getTopic,
  getTopics,
};
