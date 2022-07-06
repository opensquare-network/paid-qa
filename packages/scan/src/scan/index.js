const {
  chain: { getApi },
  utils: { sleep, getHeadUsedInGB },
  scan: { oneStepScan },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const { scanBlock } = require("./block");
const { getNextScanHeight } = require("../mongo/scanHeight");

async function scan() {
  if (firstScanKnowHeights()) {
    // todo: scan known heights
  }

  let toScanHeight = await getNextScanHeight();

  while (true) {
    const api = await getApi();
    if (!api.isConnected) {
      console.log("Api not connected, restart process");
      process.exit(0);
    }

    try {
      toScanHeight = await oneStepScan(toScanHeight, scanBlock);
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

module.exports = {
  scan,
};
