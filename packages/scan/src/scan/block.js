const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { handleExtrinsic } = require("./business");
const { extrinsicSuccess } = require("./utils/extrinsics");
const { ExtrinsicIndexer } = require("../common/types/ExtrinsicIndexer");
const { updateScanHeight } = require("../mongo/scanHeight");

async function scanBlock({ height, block, events }) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);

  await updateScanHeight(height);
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
