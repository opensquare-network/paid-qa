let scanStep = parseInt(process.env.SCAN_STEP) || 100;
const { CHAINS } = require("./constants");
let chain = null;

function setChain(targetChain) {
  chain = targetChain;
}

function currentChain() {
  if (chain) {
    return chain;
  }

  const allChains = Object.values(CHAINS);
  if (allChains.includes(process.env.CHAIN)) {
    setChain(process.env.CHAIN);
    return chain;
  }

  throw new Error("Invalid CHAIN env variable");
}

function getScanStep() {
  return scanStep;
}

// For test
function setScanStep(step) {
  scanStep = step;
}

module.exports = {
  currentChain,
  getScanStep,
  setScanStep,
}
