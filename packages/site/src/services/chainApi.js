import { ApiPromise, WsProvider } from "@polkadot/api";
import { isWeb3Injected, web3FromAddress } from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";
import { encodeAddress } from "@polkadot/keyring";

import {
  DEFAULT_KUSAMA_NODE_URL,
  DEFAULT_KUSAMA_NODES,
  DEFAULT_POLKADOT_NODE_URL,
  DEFAULT_POLKADOT_NODES,
} from "../utils/constants";

const apiInstanceMap = new Map();

let nodeUrl = (() => {
  let localNodeUrl = null;
  try {
    localNodeUrl = JSON.parse(localStorage.getItem("nodeUrl"));
  } catch (e) {
    // ignore parse error
  }
  return {
    kusama:
      DEFAULT_KUSAMA_NODES.find((item) => item.url === localNodeUrl?.kusama)
        ?.url || DEFAULT_KUSAMA_NODE_URL,
    polkadot:
      DEFAULT_POLKADOT_NODES.find((item) => item.url === localNodeUrl?.polkadot)
        ?.url || DEFAULT_POLKADOT_NODE_URL,
  };
})();

export const getNodeUrl = () => nodeUrl;

export const getNodes = () => ({
  kusama: DEFAULT_KUSAMA_NODES,
  polkadot: DEFAULT_POLKADOT_NODES,
});

export const getApi = async (chain, queryUrl) => {
  const url = queryUrl || nodeUrl?.[chain];
  if (!apiInstanceMap.has(url)) {
    apiInstanceMap.set(
      url,
      ApiPromise.create({ provider: new WsProvider(url) })
    );
  }
  return apiInstanceMap.get(url);
};

export const encodeKusamaAddress = (address) => {
  try {
    return encodeAddress(address, 2);
  } catch {
    return "";
  }
};

export const encodePolkadotAddress = (address) => {
  try {
    return encodeAddress(address, 0);
  } catch {
    return "";
  }
};

export const encodeSubstrateAddress = (address) => {
  try {
    return encodeAddress(address, 42);
  } catch {
    return "";
  }
};
