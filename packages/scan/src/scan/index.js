const {
  chain: {
    getApi,
    getLatestHeight,
    updateSpecs,
    getMetaScanHeight,
    fetchBlocks,
  },
  logger,
  env: { isUseMetaDb },
  utils: { sleep, getHeadUsedInGB },
} = require("@osn/scan-common");
const { updateScanHeight } = require("../mongo/scanHeight");
const { scanBlock } = require("./block");
const { getTargetHeight, getHeights } = require("./utils");
const { getNextScanHeight } = require("../mongo/scanHeight");
const last = require("lodash.last");

async function scan() {
  let toScanHeight = await getNextScanHeight();

  while (true) {
    const api = await getApi();
    if (!api.isConnected) {
      console.log("Api not connected, restart process");
      process.exit(0);
    }

    try {
      toScanHeight = await oneStepScan(toScanHeight);
    } finally {
      if (getHeadUsedInGB() > 1) {
        console.log(
          `${getHeadUsedInGB()}GB heap used, restart process in case of memory leak`
        );
        process.exit(0);
      }
    }

    await sleep(0);
  }
}

async function oneStepScan(startHeight) {
  const finalizedHeight = getLatestHeight();

  if (startHeight > finalizedHeight) {
    // Just wait if the to scan height greater than current chain height
    await sleep(3000);
    return startHeight;
  }

  let targetHeight = getTargetHeight(startHeight);
  if (isUseMetaDb()) {
    if (targetHeight > getMetaScanHeight()) {
      await updateSpecs();
    }
  }

  const heights = getHeights(startHeight, targetHeight);
  const blocks = await fetchBlocks(heights);
  if ((blocks || []).length <= 0) {
    await sleep(1000);
    return startHeight;
  }

  for (const wrappedBlock of blocks) {
    if (!wrappedBlock) {
      process.exit(0);
    }

    const { block, events, height } = wrappedBlock;
    try {
      console.log({ height });
      const blockIndexer = await scanBlock(block, events);
      await updateScanHeight(blockIndexer.blockHeight);
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
