const { Appendant } = require("@paid-qa/backend-common/src/models");
const { fetchIpfsJson } = require("./utils");

async function fetchAppendant(appendant) {
  const appendantIpfsCid = appendant.cid;

  const appendantData = await fetchIpfsJson(appendantIpfsCid);
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
  for (const appendant of appendants) {
    console.log(`Fetching appendant ${appendant.cid}`);
    await fetchAppendant(appendant);
  }
}

module.exports = fetchAppendants;
