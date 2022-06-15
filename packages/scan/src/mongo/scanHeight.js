const { Status } = require("@paid-qa/backend-common/src/models/scan");
const isNil = require("lodash.isnil");
const { currentChain } = require("../common/env");
const { CHAINS } = require("../common/constants");

const genesisHeight = 1;
const mainScanName = "scan-height";

const scanStartHeight = {
  [CHAINS.KUSAMA]: 11519225,
  [CHAINS.POLKADOT]: 9139074,
  [CHAINS.STATEMINE]: 9139074,
  [CHAINS.WESTEND]: 9688127,
  [CHAINS.WESTMINT]: 2009349,
};

async function getNextScanHeight() {
  const heightInfo = await Status.findOne({ name: mainScanName });

  let result;
  if (!heightInfo) {
    result = genesisHeight;
  } else if (typeof heightInfo.value === "number") {
    result = heightInfo.value + 1;
  } else {
    console.error("Scan height value error in DB!");
    process.exit(1);
  }

  const startHeight = scanStartHeight[currentChain()];
  if (!isNil(startHeight) && result < startHeight) {
    return startHeight;
  }

  return result;
}

async function updateScanHeight(height) {
  await Status.updateOne(
    { name: mainScanName },
    { $set: { value: height } },
    { upsert: true }
  );
}

module.exports = {
  getNextScanHeight,
  updateScanHeight,
};
