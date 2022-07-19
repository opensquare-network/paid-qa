import debounce from "lodash.debounce";
import { identityChainMap } from "@osn/constants";
import { encodeNetworkAddress } from "../utils";

const identityServerHost =
  process.env.REACT_APP_IDENTITY_SERVER_HOST ||
  process.env.NEXT_PUBLIC_IDENTITY_SERVER_HOST ||
  "https://id.statescan.io";

const cachedIdentities = new Map();
let pendingQueries = new Map();

const delayQuery = debounce((fetchOptions) => {
  const pending = pendingQueries;
  if (pending.size < 1) {
    return;
  }
  pendingQueries = new Map();

  const chainAddresses = {};
  const idNames = [...pending.keys()];
  const idNameSplits = idNames.map((item) => item.split("/"));
  for (const [chain, address] of idNameSplits) {
    if (!chainAddresses[chain]) {
      chainAddresses[chain] = [];
    }
    chainAddresses[chain].push(address);
  }

  for (const chain in chainAddresses) {
    const addresses = chainAddresses[chain];

    const headers = {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8",
    };

    fetch(`${identityServerHost}/${chain}/short-ids`, {
      ...fetchOptions,
      headers,
      method: "POST",
      body: JSON.stringify({ addresses }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const identities = new Map(data.map((item) => [item.address, item]));

        for (const [idName, [, resolve, reject]] of pending) {
          const [chainOfIdName, addrOfIdName] = idName.split("/");
          if (chainOfIdName !== chain) {
            continue;
          }
          const identity = identities.get(addrOfIdName) || null;
          cachedIdentities.set(idName, identity);
          if (resolve) {
            resolve(identity);
          }
        }
      })
      .catch(() => {
        for (const [idName, [, , reject]] of pending) {
          const [chainOfIdName] = idName.split("/");
          if (chainOfIdName !== chain) {
            continue;
          }
          if (reject) {
            reject();
          }
        }
      });
  }
}, 0);

/**
 * @param {RequestInit} fetchOptions
 */
export function fetchIdentity(chain, address, fetchOptions = {}) {
  const targetChain = identityChainMap[chain] || chain;
  const targetAddress = encodeNetworkAddress(address, targetChain);
  const idName = `${targetChain}/${targetAddress}`;
  if (cachedIdentities.has(idName)) {
    return Promise.resolve(cachedIdentities.get(idName));
  }

  const pending = pendingQueries;

  if (!pending.has(idName)) {
    pending.set(idName, [
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const promise = pending.get(idName);
          promise.push(resolve, reject);
          delayQuery(fetchOptions);
        }, 0)
      ),
    ]);
  }

  return pending.get(idName)[0];
}
