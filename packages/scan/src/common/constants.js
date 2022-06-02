const CHAINS = {
  KUSAMA: "kusama",
  POLKADOT: "polkadot",
  STATEMINE: "statemine",
  WESTEND: "westend",
  WESTMINT: "westmint",
};

const ASSET_PARA_CHAIN = [CHAINS.STATEMINE, CHAINS.WESTMINT];

const SECTIONS = {
  SYSTEM: "system",
  UTILITY: "utility",
};

const METHODS = {
  REMARK: "remark",
  BATCH: "batch",
};

module.exports = {
  CHAINS,
  ASSET_PARA_CHAIN,
  SECTIONS,
  METHODS,
};
