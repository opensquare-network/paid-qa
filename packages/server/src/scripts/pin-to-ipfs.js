const dotenv = require("dotenv");
dotenv.config();

const { Topic } = require("../models");
const { ipfsAdd } = require("../services/ipfs.service");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startPin() {
  const topics = await Topic.find({ pinned: false });
  for (const topic of topics) {
    try {
      const added = await ipfsAdd(topic.data);
      const pinnedCid = added?.cid?.toV0().toString();
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

async function main() {
  while (true) {
    try {
      await startPin();
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
