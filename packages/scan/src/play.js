// westend 9688365-2: osn:q:1:N:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye

require("dotenv").config();
const { scanBlock } = require("./scan/block");
const { fetchBlocks } = require("./scan/fetch");
const { initDb, closeDb, } = require("./mongo");

async function play() {
  await initDb();

  const heights = [9688365];
  const blocks = await fetchBlocks(heights);
  for (const { block, events } of blocks) {
    const blockIndexer = await scanBlock(block, events);
    console.log(`${blockIndexer.blockHeight} done`)
  }
}

play()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
  .finally(async () => {
    await closeDb();
  });
