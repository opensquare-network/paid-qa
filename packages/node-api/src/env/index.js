const { Chains } = require("../constants");

const chainEndpointsMap = {
  [Chains.polkadot]: process.env.DOT_ENDPOINTS,
  [Chains.kusama]: process.env.KSM_ENDPOINTS,
  [Chains.westend]: process.env.WND_ENDPOINTS,
  [Chains.statemine]: process.env.STATEMINE_ENDPOINTS,
  [Chains.statemint]: process.env.STATEMINT_ENDPOINTS,
  [Chains.westmint]: process.env.WESTMINT_ENDPOINTS,
};

// [chain, endpoints]
const endpoints = Object.values(Chains).map((chain) => {
  let endpoints;
  endpoints = (chainEndpointsMap[chain] || "").split(";");

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
