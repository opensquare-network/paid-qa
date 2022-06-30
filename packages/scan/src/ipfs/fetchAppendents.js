const { Appendant } = require("@paid-qa/backend-common/src/models/scan");
const { fetchIpfsJson } = require("./utils");

async function fetchAppendant(appendant) {
  const appendantIpfsCid = appendant.cid;

  const appendantData = await fetchIpfsJson(appendantIpfsCid);
  if (!appendantData) {
    await Appendant.updateOne(
      { _id: appendant._id },
      {
        $inc: { retries: 1 },
        $set: { lastRetryTime: new Date() },
      }
    );
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
  const appendants = await Appendant.find({
    parsed: false,
    $or: [{ retries: null }, { retries: { $ne: null, $lt: 20 } }],
  });
  console.log(`Fetching ${appendants.length} appendants`);
  for (const appendant of appendants) {
    console.log(`Fetching appendant ${appendant.cid}`);
    await fetchAppendant(appendant);
  }
}

module.exports = fetchAppendants;
