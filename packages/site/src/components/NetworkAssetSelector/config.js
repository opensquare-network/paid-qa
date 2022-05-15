const polkadot = {
  id: "polkadot",
  name: "Polkadot",
  symbol: "DOT",
  decimals: 10,
};

const kusama = {
  id: "kusama",
  name: "Kusama",
  symbol: "KSM",
  decimals: 12,
};

const westend = {
  id: "westend",
  name: "Westend",
  symbol: "WND",
  decimals: 12,
};

export const NetworkAssets = {
  polkadot: [
    {
      ...polkadot,
      tokenIdentifier: "N",
    },
  ],
  kusama: [
    {
      ...kusama,
      tokenIdentifier: "N",
    },
  ],
  statemint: [
    {
      ...polkadot,
      tokenIdentifier: "N",
    },
  ],
  statemine: [
    {
      ...kusama,
      tokenIdentifier: "N",
    },
    {
      id: "rmrk",
      name: "RMRK",
      symbol: "RMRK",
      decimals: 10,
      tokenIdentifier: "8",
    },
    {
      id: "polarisdao",
      name: "PolarisDAO",
      symbol: "ARIS",
      tokenIdentifier: "16",
      decimals: 8,
    },
  ],
  karura: [
    {
      id: "karura",
      name: "Karura",
      symbol: "KAR",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  khala: [
    {
      id: "khala",
      name: "Khala",
      symbol: "PHA",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  bifrost: [
    {
      id: "bifrost",
      name: "Bifrost",
      symbol: "BNC",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  kintsugi: [
    {
      id: "kintsugi",
      name: "Kintsugi",
      symbol: "KINT",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  westend: [
    {
      ...westend,
      tokenIdentifier: "N",
    },
  ],
  westmint: [
    {
      ...westend,
      tokenIdentifier: "N",
    },
    {
      id: "osn",
      name: "OpenSquare",
      symbol: "OSNT",
      decimals: 10,
      tokenIdentifier: "0",
    },
  ],
};

export const IconsMap = {
  karura: "karura.svg",
  rmrk: "rmrk.svg",
  polarisdao: "polarisdao.png",
  osn: "osn.svg",
  westend: "westend.svg",
};
