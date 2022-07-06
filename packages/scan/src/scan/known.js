const { getNextScanHeight } = require("../mongo/scanHeight");
const { getHeightCollection } = require("../mongo/known");
const {
  chain: { fetchBlocks },
  utils: { sleep },
  env: { getScanStep },
  logger,
} = require("@osn/scan-common");
const last = require("lodash.last");
const { scanBlock } = require("./block");

async function getNextKnownHeights(beginHeight) {
  const step = getScanStep();
  const col = await getHeightCollection();
  const records = await col
    .find({
      height: { $gte: beginHeight },
    })
    .sort({ height: 1 })
    .limit(step)
    .toArray();

  return (records || []).map((item) => item.height);
}

let count = 0;

async function scanKnownHeights() {
  const toScanHeight = await getNextScanHeight();
  let heights = await getNextKnownHeights(toScanHeight);
  heights = heights.slice(0, 10);

  while (heights.length > 0) {
    const blocks = await fetchBlocks(heights);
    for (const block of blocks) {
      try {
        await scanBlock(block);
      } catch (e) {
        await sleep(0);
        logger.error(`Error with known block scan ${block.height}`, e);
      }
    }

    const lastHeight = last(blocks || [])?.height;
    logger.info(`${lastHeight} scan finished! - known height scan`);

    count++;
    if (count % 10 === 0) {
      console.log(`${lastHeight} restart process in case of memory leak`);
      process.exit(0);
    }

    heights = await getNextKnownHeights(lastHeight + 1);
  }
}

module.exports = {
  scanKnownHeights,
};
