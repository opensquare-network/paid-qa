// westend 9688365-2: osn:q:1:N:N:1:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye
// westend 9755646-2: osn:q:1:A:bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye:bafybeidzruwvbbhhohll7mif5rbuupkfoeeltjf6bi3meristpx7milt2a
// westend 9756325-2: osn:q:1:AS:bafybeibknoqig3k472ke56llloupmlf7g6u6xwxntje4pm2a37npb343n4

require("dotenv").config();
const { scanBlock } = require("./scan/block");
const { fetchBlocks } = require("./scan/fetch");
const { disconnect } = require("./chain/api");

async function play() {
  const heights = [
    2009349, 2009392, 2009446, 2009474, 2009512, 2009530, 2016376, 2016390,
    2016467, 2016687, 2016736, 2016896, 2016903, 2016906, 2016913, 2136887,
    2144217, 2144426, 2247795, 2247833, 2247846, 2247851, 2247877, 2247883,
    2247892, 2247897, 2257102, 2257106, 2259642,
  ];
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
    await disconnect();
  });
