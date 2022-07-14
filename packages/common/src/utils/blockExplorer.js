import { Chains } from "@osn/constants";

const StatescanNetworks = ["statemint", "statemine", "westmint"];

export function getExtrinsicLink(network, blockHeight, extrinsicIndex) {
  if (StatescanNetworks.includes(network)) {
    return `https://${network}.statescan.io/extrinsic/${blockHeight}-${extrinsicIndex}`;
  } else {
    return `https://${network}.subscan.io/extrinsic/${blockHeight}-${extrinsicIndex}`;
  }
}

export function getAddressLink(network, address) {
  if (Chains.moonriver === network) {
    return `https://moonriver.moonscan.io/address/${address}`;
  }

  if (StatescanNetworks.includes(network)) {
    return `https://${network}.statescan.io/account/${address}`;
  } else {
    return `https://${network}.subscan.io/account/${address}`;
  }
}
