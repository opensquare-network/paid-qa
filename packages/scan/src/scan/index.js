const { updateScanHeight } = require("../mongo/scanHeight");
const { scanBlock } = require("./block");
const { fetchBlocks } = require("./fetch");
const { getTargetHeight, getHeights } = require("./utils");
const { sleep } = require("../common/utils/sleep");
const { getFinalizedHeight } = require("../chain/finalized");
const { deleteFromHeight } = require("./delete");
const { getNextScanHeight } = require("../mongo/scanHeight");
const { logger } = require("../common/logger");
const last = require("lodash.last");

async function scan() {
  let toScanHeight = await getNextScanHeight();
  await deleteFromHeight(toScanHeight);
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight);
  }
}

async function oneStepScan(startHeight) {
  const finalizedHeight = getFinalizedHeight();
  if (startHeight > finalizedHeight) {
    // Just wait if the to scan height greater than current chain height
    await sleep(3000);
    return startHeight;
  }

  const targetHeight = getTargetHeight(startHeight);
  const heights = getHeights(startHeight, targetHeight);
  const blocks = await fetchBlocks(heights);

  for (const wrappedBlock of blocks) {
    if (!wrappedBlock) {
      process.exit(0);
    }

    const { block, events, height } = wrappedBlock;
    try {
      const blockIndexer = await scanBlock(block, events);
      await updateScanHeight(blockIndexer.blockHeight);

      if (height % 10000 === 0) {
        process.exit(0); // in case of memory leak
      }
    } catch (e) {
      logger.error(`Error with block scan ${height}`, e);
    }
  }

  const lastHeight = last(blocks || []).height;
  logger.info(`${startHeight} - ${lastHeight} done!`);
  return lastHeight + 1;
}

module.exports = {
  scan,
};
