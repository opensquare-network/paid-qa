const { extractExtrinsicEvents, isExtrinsicSuccess } = require("./utils/extrinsics");
const { getBlockIndexer } = require("./utils/indexer");

async function scanBlock(block, events = []) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block.extrinsics, events, blockIndexer)

  return blockIndexer;
}

async function handleExtrinsics(extrinsics, allEvents, blockIndexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndex = index++;
    const extrinsicIndexer = {
      ...blockIndexer,
      extrinsicIndex,
    };
    // TODO: handle extrinsic
  }
}

module.exports = {
  scanBlock,
}
