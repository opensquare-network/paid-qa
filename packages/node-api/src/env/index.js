const { Chains } = require("../constants");

// [chain, endpoints]
const endpoints = Object.values(Chains).map((chain) => {
  let endpoints = [];
  if (Chains.polkadot === chain) {
    endpoints = (process.env.DOT_ENDPOINTS || "").split(";");
  } else if (Chains.kusama === chain) {
    endpoints = (process.env.KSM_ENDPOINTS || "").split(";");
  } else if (Chains.karura === chain) {
    endpoints = (process.env.KAR_ENDPOINTS || "").split(";");
  } else if (Chains.khala === chain) {
    endpoints = (process.env.KHA_ENDPOINTS || "").split(";");
  } else if (Chains.statemine === chain) {
    endpoints = (process.env.STATEMINE_ENDPOINTS || "").split(";");
  } else if (Chains.bifrost === chain) {
    endpoints = (process.env.BNC_ENDPOINTS || "").split(";");
  } else if (Chains.kintsugi === chain) {
    endpoints = (process.env.KINT_ENDPOINTS || "").split(";");
  }

  return {
    chain,
    endpoints,
  };
});

function getEndpoints() {
  return endpoints;
}

module.exports = {
  getEndpoints,
};
