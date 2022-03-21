import { encodeAddress } from "@polkadot/util-crypto";
import { ChainSS58Format } from "../utils/constants";

export function encodeAddressByChain(origin, chain) {
  const ss58Format = ChainSS58Format[chain];
  if (typeof ss58Format === "undefined") {
    throw new Error(`Can not find ss58Format for ${chain}`);
  }

  return encodeAddress(origin, ss58Format);
}

export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
