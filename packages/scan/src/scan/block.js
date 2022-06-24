const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { handleExtrinsic } = require("./business");
const { extrinsicSuccess } = require("./utils/extrinsics");
const { ExtrinsicIndexer } = require("../common/types/ExtrinsicIndexer");

async function scanBlock(block, events = []) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);

  return blockIndexer;
}

async function handleExtrinsics(extrinsics, allEvents, blockIndexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    if (!extrinsicSuccess(allEvents, index)) {
      continue;
    }

    const extrinsicIndexer = ExtrinsicIndexer.create(blockIndexer, index++);
    await handleExtrinsic(extrinsic, extrinsicIndexer);
  }
}

module.exports = {
  scanBlock,
};
