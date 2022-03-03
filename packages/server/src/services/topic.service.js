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

module.exports = {
  createTopic,
};
