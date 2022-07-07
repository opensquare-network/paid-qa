const dotenv = require("dotenv");
dotenv.config();

const {
  Topic,
  Appendant,
  Answer,
} = require("@paid-qa/backend-common/src/models");
const { ipfsAdd } = require("../services/ipfs.service");

async function startPinTopics() {
  const topics = await Topic.find({ pinned: { $ne: true } }).limit(50);
  for (const topic of topics) {
    try {
      const added = await ipfsAdd(topic.data);
      const pinnedCid = added?.cid?.toV1().toString();
      if (pinnedCid !== topic.cid) {
        console.error(
          `Pinned topic ${topic.title}: IPFS path does not match CID`
        );
        return;
      }
      await Topic.updateOne({ _id: topic._id }, { pinned: true });
      console.log(`Pinned topic ${topic.title} at ${pinnedCid}`);
    } catch (e) {
      console.error(e);
    }
  }
}

async function startPinAppendants() {
  const appendants = await Appendant.find({ pinned: false }).limit(50);
  for (const appendant of appendants) {
    try {
      const added = await ipfsAdd(appendant.data);
      const pinnedCid = added?.cid?.toV1().toString();
      if (pinnedCid !== appendant.cid) {
        console.error(
          `Pinned appendant ${appendant._id}: IPFS path does not match CID`
        );
        return;
      }
      await Appendant.updateOne({ _id: appendant._id }, { pinned: true });
      console.log(`Pinned appendant ${appendant._id} at ${pinnedCid}`);
    } catch (e) {
      console.error(e);
    }
  }
}

async function startPinAnswers() {
  const answers = await Answer.find({ pinned: false }).limit(50);
  for (const answer of answers) {
    try {
      const added = await ipfsAdd(answer.data);
      const pinnedCid = added?.cid?.toV1().toString();
      if (pinnedCid !== answer.cid) {
        console.error(
          `Pinned answer ${answer._id}: IPFS path does not match CID`
        );
        return;
      }
      await Answer.updateOne({ _id: answer._id }, { pinned: true });
      console.log(`Pinned answer ${answer._id} at ${pinnedCid}`);
    } catch (e) {
      console.error(e);
    }
  }
}

async function startPin() {
  return Promise.all([
    startPinTopics(),
    startPinAppendants(),
    startPinAnswers(),
  ]);
}

async function main() {
  try {
    await startPin();
    console.log(`Last pin at:`, new Date());
  } catch (e) {
    console.error(e);
  }
}

main().finally(() => process.exit());
