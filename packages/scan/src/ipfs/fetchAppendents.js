const { Appendant } = require("@paid-qa/backend-common/src/models/scan");
const { fetchIpfsJsonInQueue } = require("./utils");

async function fetchAppendant(appendant) {
  const appendantIpfsCid = appendant.cid;

  const appendantData = await fetchIpfsJsonInQueue(appendantIpfsCid);
  if (!appendantData) {
    return;
  }

  const { topic, content } = appendantData;

  await Appendant.updateOne(
    { _id: appendant._id },
    {
      topicCid: topic,
      content,
      parsed: true,
    }
  );
}

async function fetchAppendants() {
  const appendants = await Appendant.find({ parsed: false });
  console.log(`Fetching ${appendants.length} appendants`);

  const promises = [];
  for (const appendant of appendants) {
    promises.push(fetchAppendant(appendant));
  }

  return promises;
}

module.exports = fetchAppendants;
