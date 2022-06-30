const { Topic } = require("@paid-qa/backend-common/src/models/scan");
const { fetchIpfsJson } = require("./utils");

async function fetchTopic(topic) {
  const topicIpfsCid = topic.cid;

  const topicData = await fetchIpfsJson(topicIpfsCid);
  if (!topicData) {
    await Topic.updateOne(
      { _id: topic._id },
      {
        $inc: { retries: 1 },
        $set: { lastRetryTime: new Date() },
      }
    );
    return;
  }

  const { title, content } = topicData;

  await Topic.updateOne({ _id: topic._id }, { title, content, parsed: true });
}

async function fetchTopics() {
  const topics = await Topic.find({
    parsed: false,
    $or: [{ retries: null }, { retries: { $ne: null, $lt: 20 } }],
  });
  console.log(`Fetching ${topics.length} topics`);
  for (const topic of topics) {
    console.log(`Fetching topic ${topic.cid}`);
    await fetchTopic(topic);
  }
}

module.exports = fetchTopics;
