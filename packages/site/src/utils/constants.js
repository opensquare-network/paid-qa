import { Chains } from "@osn/constants";

const DEVELOPMENT_NETWORK = [
  { network: Chains.westend },
  { network: Chains.westmint },
];

const PRODUCTION_NETWORK = [
  { network: Chains.polkadot },
  { network: Chains.kusama },
  { network: Chains.statemint },
  { network: Chains.statemine },
];

export const AVAILABLE_NETWORKS = [];

if (process.env.REACT_APP_ENVIRONMENT === "development") {
  AVAILABLE_NETWORKS.push(...DEVELOPMENT_NETWORK);
} else if (process.env.REACT_APP_ENVIRONMENT === "production") {
  AVAILABLE_NETWORKS.push(...PRODUCTION_NETWORK);
}

export const ASSETS = [
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
  },
  {
    id: "kusama",
    name: "Kusama",
    symbol: "KSM",
  },
  {
    id: "rmrk",
    name: "RMRK",
    symbol: "RMRK",
  },
  {
    id: "polarisdao",
    name: "PolarisDAO",
    symbol: "ARIS",
  },
];

export const TEST_ASSETS = [
  {
    id: "westend",
    name: "Westend",
    symbol: "WND",
  },
  {
    id: "opensquare",
    name: "OpenSquare",
    symbol: "OSNT",
  },
];

export const DEFAULT_POLKADOT_NODES = [
  {
    name: "Parity",
    url: "wss://rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "Dwellir",
    url: "wss://polkadot-rpc.dwellir.com",
  },
];
export const DEFAULT_POLKADOT_NODE_URL = DEFAULT_POLKADOT_NODES[0]?.url;

export const DEFAULT_STATEMINE_NODES = [
  {
    name: "Parity",
    url: "wss://statemine-rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://statemine.api.onfinality.io/public-ws",
  },
];
export const DEFAULT_STATEMINE_NODE_URL = DEFAULT_STATEMINE_NODES[0]?.url;

export const DEFAULT_KUSAMA_NODES = [
  {
    name: "Parity",
    url: "wss://kusama-rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://kusama.api.onfinality.io/public-ws",
  },
  {
    name: "Patract",
    url: "wss://pub.elara.patract.io/kusama",
  },
];
export const DEFAULT_KUSAMA_NODE_URL = DEFAULT_KUSAMA_NODES[0]?.url;

export const DEFAULT_WESTEND_NODES = [
  {
    name: "Parity",
    url: "wss://westend-rpc.polkadot.io",
  },
  {
    name: "OnFinality",
    url: "wss://westend.api.onfinality.io/public-ws",
  },
  {
    name: "Pinknode",
    url: "wss://rpc.pinknode.io/westend/explorer",
  },
  {
    name: "Dwellir",
    url: "wss://westend-rpc.dwellir.com",
  },
];

export const DEFAULT_WESTEND_NODE_URL = DEFAULT_WESTEND_NODES[0]?.url;

export const DEFAULT_WESTMINT_NODES = [
  {
    name: "Parity",
    url: "wss://westmint-rpc.polkadot.io",
  },
  {
    name: "Dwellir",
    url: "wss://westmint-rpc.dwellir.com",
  },
];

export const DEFAULT_WESTMINT_NODE_URL = DEFAULT_WESTMINT_NODES[0]?.url;

export const DEFAULT_NODES = {
  polkadot: DEFAULT_POLKADOT_NODE_URL,
  kusama: DEFAULT_KUSAMA_NODE_URL,
  statemine: DEFAULT_STATEMINE_NODE_URL,
  westend: DEFAULT_WESTEND_NODE_URL,
  westmint: DEFAULT_WESTMINT_NODE_URL,
};

export const EmptyList = {
  items: [],
  page: 1,
  pageSize: 10,
  total: 0,
};

export const tabRouterMap = new Map([
  ["notifications", "notifications"],
  ["discussions", "notifications/discussion"],
  ["rewards", "notifications/reward"],
]);

export const PROJECT_NAME = "OpenSquare-Paid-QA";

export const ASSET_CHAINS = ["statemine", "westmint"];

export const DEFAULT_MINIMUM_FUND_AMOUNT = 0.01;

export const MINIMUM_FUND_AMOUNTS = {
  DOT: 0.1,
  KSM: 0.01,
  RMRK: 0.1,
  OSNT: 0.1,
  WND: 0.1,
};
