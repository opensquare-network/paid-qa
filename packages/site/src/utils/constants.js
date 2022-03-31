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

export const DEFAULT_KARURA_NODES = [
  {
    name: "OnFinality",
    url: "wss://karura.api.onfinality.io/public-ws",
  },
  {
    name: "Polkawallet",
    url: "wss://karura.polkawallet.io",
  },
  {
    name: "Acala Foundation 0",
    url: "wss://karura-rpc-0.aca-api.network",
  },
  {
    name: "Acala Foundation 1",
    url: "wss://karura-rpc-1.aca-api.network",
  },
  {
    name: "Acala Foundation 2",
    url: "wss://karura-rpc-2.aca-api.network/ws",
  },
  {
    name: "Acala Foundation 3",
    url: "wss://karura-rpc-3.aca-api.network/ws",
  },
];
export const DEFAULT_KARURA_NODE_URL = DEFAULT_KARURA_NODES[0]?.url;

export const DEFAULT_ACALA_NODES = [
  {
    name: "OnFinality",
    url: "wss://acala-polkadot.api.onfinality.io/public-ws",
  },
  {
    name: "Polkawallet",
    url: "wss://acala.polkawallet.io/",
  },
  {
    name: "Acala Foundation 0",
    url: "wss://acala-rpc-0.aca-api.network/",
  },
  {
    name: "Acala Foundation 1",
    url: "wss://acala-rpc-1.aca-api.network/",
  },
  {
    name: "Acala Foundation 2",
    url: "wss://acala-rpc-2.aca-api.network/ws",
  },
  {
    name: "Acala Foundation 3",
    url: "wss://acala-rpc-3.aca-api.network/ws",
  },
];
export const DEFAULT_ACALA_NODE_URL = DEFAULT_ACALA_NODES[0]?.url;

export const DEFAULT_KHALA_NODES = [
  {
    name: "OnFinality",
    url: "wss://khala.api.onfinality.io/public-ws",
  },
];
export const DEFAULT_KHALA_NODE_URL = DEFAULT_KHALA_NODES[0]?.url;

export const DEFAULT_BASILISK_NODES = [
  {
    name: "OnFinality",
    url: "wss://basilisk.api.onfinality.io/public-ws",
  },
  {
    name: "HydraDX",
    url: "wss://rpc-01.basilisk.hydradx.io",
  },
];
export const DEFAULT_BASILISK_NODE_URL = DEFAULT_BASILISK_NODES[0]?.url;

export const DEFAULT_BIFROST_NODES = [
  {
    name: "OnFinality",
    url: "wss://bifrost-parachain.api.onfinality.io/public-ws",
  },
  {
    name: "Liebi",
    url: "wss://bifrost-rpc.liebi.com/ws",
  },
];

export const DEFAULT_BIFROST_NODE_URL = DEFAULT_BIFROST_NODES[0]?.url;

export const DEFAULT_KINTSUGI_NODES = [
  {
    name: "OnFinality",
    url: "wss://kintsugi.api.onfinality.io/public-ws",
  },
  {
    name: "Kintsugi Labs",
    url: "wss://api-kusama.interlay.io/parachain",
  },
];

export const DEFAULT_KINTSUGI_NODE_URL = DEFAULT_KINTSUGI_NODES[0]?.url;

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

export const DEFAULT_NODES = {
  polkadot: DEFAULT_POLKADOT_NODE_URL,
  kusama: DEFAULT_KUSAMA_NODE_URL,
  karura: DEFAULT_KARURA_NODE_URL,
  acala: DEFAULT_ACALA_NODE_URL,
  khala: DEFAULT_KHALA_NODE_URL,
  basilisk: DEFAULT_BASILISK_NODE_URL,
  bifrost: DEFAULT_BIFROST_NODE_URL,
  kintsugi: DEFAULT_KINTSUGI_NODE_URL,
  westend: DEFAULT_WESTEND_NODE_URL,
};

export const MOBILE_SIZE = 900;

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
