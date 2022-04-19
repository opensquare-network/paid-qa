export const Chains = {
  polkadot: "polkadot",
  kusama: "kusama",
  statemine: "statemine",
  karura: "karura",
  acala: "acala",
  khala: "khala",
  basilisk: "basilisk",
  kabocha: "kabocha",
  bifrost: "bifrost",
  kintsugi: "kintsugi",
  westend: "westend",
};

export const ChainSS58Format = Object.freeze({
  [Chains.polkadot]: 0,
  [Chains.kusama]: 2,
  [Chains.statemine]: 2,
  [Chains.karura]: 8,
  [Chains.khala]: 30,
  [Chains.bifrost]: 6,
  [Chains.kintsugi]: 2092,
  [Chains.westend]: 2,
});

export const AVAILABLE_NETWORKS = [
  { network: Chains.polkadot },
  { network: Chains.kusama },
  { network: Chains.statemine },
];

if (process.env.REACT_APP_SHOW_WESTEND === "TRUE") {
  AVAILABLE_NETWORKS.push({ network: Chains.westend });
}

export const MOBILE_SIZE = 900;

export default {
  Chains,
  ChainSS58Format,
};
