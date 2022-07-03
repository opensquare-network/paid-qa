import { ApiPromise, WsProvider } from "@polkadot/api";
import { Chains } from "@osn/constants";
import {
  bifrostOptions,
  karuraOptions,
  khalaOptions,
  kintsugiOptions,
} from "@osn/provider-options";

const apiInstanceMap = new Map();

export default async function getApi(chain, endpoint) {
  if (!Object.keys(Chains).includes(chain)) {
    throw new Error(`Invalid chain: ${chain} to construct api`);
  }

  if (!apiInstanceMap.has(endpoint)) {
    const provider = new WsProvider(endpoint, 1000);
    const options = { provider };
    let customOptions = {};
    if (chain === "karura" || chain === "acala") {
      customOptions = karuraOptions;
    } else if (chain === "khala") {
      customOptions = khalaOptions;
    } else if (chain === "bifrost") {
      customOptions = bifrostOptions;
    } else if (chain === Chains.kintsugi) {
      customOptions = kintsugiOptions;
    }

    apiInstanceMap.set(
      endpoint,
      ApiPromise.create({
        ...options,
        ...customOptions,
      })
    );
  }
  return apiInstanceMap.get(endpoint);
}
