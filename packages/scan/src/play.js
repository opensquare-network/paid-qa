// westend 9688365-2: osn:q:1:N:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye
// westend 9755646-2: osn:q:1:A:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye:bafybeidzruwvbbhhohll7mif5rbuupkfoeeltjf6bi3meristpx7milt2a
// westend 9756325-2: osn:q:1:AS:bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4

require("dotenv").config();
const { scanBlock } = require("./scan/block");
const { fetchBlocks } = require("./scan/fetch");
const { initDb, closeDb } = require("./mongo");
const { disconnect } = require("./chain/api");

async function play() {
  await initDb();

  const heights = [2261918];
  const blocks = await fetchBlocks(heights);
  for (const { block, events } of blocks) {
    const blockIndexer = await scanBlock(block, events);
    console.log(`${blockIndexer.blockHeight} done`);
  }
}

play()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
  .finally(async () => {
    await closeDb();
    await disconnect();
  });
