const {
  chain: { getLatestHeight },
  env: { getScanStep },
} = require("@osn/scan-common");

function getTargetHeight(startHeight) {
  const chainHeight = getLatestHeight();

  let targetHeight = chainHeight;
  const step = getScanStep();
  if (startHeight + step < chainHeight) {
    targetHeight = startHeight + step;
  }

  return targetHeight;
}

function getHeights(start, end) {
  const heights = [];
  for (let i = start; i <= end; i++) {
    heights.push(i);
  }

  return heights;
}

module.exports = {
  getTargetHeight,
  getHeights,
};
