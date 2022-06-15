const { Topic } = require("@paid-qa/backend-common/src/models/scan");
const { fetchIpfsJson } = require("./utils");

async function fetchTopic(topic) {
  const topicIpfsCid = topic.cid;

  const topicData = await fetchIpfsJson(topicIpfsCid);
  if (!topicData) {
    return;
  }

  const { title, content } = topicData;

  await Topic.updateOne({ _id: topic._id }, { title, content, parsed: true });
}

async function fetchTopics() {
  const topics = await Topic.find({ parsed: false });
  console.log(`Fetching ${topics.length} topics`);
  for (const topic of topics) {
    console.log(`Fetching topic ${topic.cid}`);
    await fetchTopic(topic);
  }
}

module.exports = fetchTopics;
