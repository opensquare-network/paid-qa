export const FOOTER_ITEMS = [
  {
    label: "Product",
    items: [
      { name: "doTreasury", link: "https://www.dotreasury.com" },
      { name: "Statescan", link: "https://statescan.io" },
      { name: "Subsquare", link: "https://www.subsquare.io" },
      { name: "CoinAsk", link: "https://www.coinask.io" },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        name: "Lightpaper",
        link: "https://github.com/opensquare-network/papers",
      },
      {
        name: "Media Kits",
        link: "https://drive.google.com/drive/folders/1nA6PTJJYfnpvB8wu9cgQaHopMRM4bqQg?usp=sharing",
      },
    ],
  },
  {
    label: "Social Links",
    items: [
      {
        name: "Github",
        icon: "github.svg",
        link: "https://github.com/opensquare-network",
      },
      {
        name: "Telegram",
        icon: "telegram.svg",
        link: "https://t.me/opensquare",
      },
      {
        name: "Twitter",
        icon: "twitter.svg",
        link: "https://twitter.com/OpensquareN",
      },
      {
        name: "Subsocial",
        icon: "subsocial.svg",
        link: "https://app.subsocial.network/@opensquare",
      },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "Email", icon: "mail.svg", link: "mailto:hi@opensquare.network" },
    ],
  },
];

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
});

//todo: add more
export const AVAILABLE_NETWORKS = [
  { network: Chains.polkadot },
  { network: Chains.kusama },
  { network: Chains.statemine },
  { network: Chains.westend }, //todo: use a .env file to add test network
];

export const MOBILE_SIZE = 900;
