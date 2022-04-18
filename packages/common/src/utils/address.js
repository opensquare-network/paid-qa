import { encodeAddress } from "@polkadot/util-crypto";
import { ChainSS58Format } from "./constants";

export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function encodeNetworkAddress(address, network) {
  if (!address || !network) {
    return null;
  }
  let encodedAddress = address;
  const ss58Format = ChainSS58Format[network];
  if (typeof ss58Format === "number") {
    encodedAddress = encodeAddress(encodedAddress, ss58Format);
  }
  return encodedAddress;
}

export function isSamePublicKey(key1, key2) {
  return encodeAddress(key1, 42) === encodeAddress(key2, 42);
}
