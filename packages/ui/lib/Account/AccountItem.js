import React from "react";
import styled, { css } from "styled-components";

import Avatar from "./Avatar";
import Address from "./Address";
import { encodeAddress } from "@polkadot/util-crypto";

export const CHAINS = Object.freeze({
  polkadot: "polkadot",
  kusama: "kusama",
  statemine: "statemine",
  karura: "karura",
  khala: "khala",
  bifrost: "bifrost",
  kintsugi: "kintsugi",
});

export const chainSs58Format = Object.freeze({
  [CHAINS.polkadot]: 0,
  [CHAINS.kusama]: 2,
  [CHAINS.statemine]: 2,
  [CHAINS.karura]: 8,
  [CHAINS.khala]: 30,
  [CHAINS.bifrost]: 6,
  [CHAINS.kintsugi]: 2092,
});

const Text = styled.p`
  color: #1e2134;
  margin: 0;
`;

const TextMinor = styled(Text)`
  color: #9da9bb;
`;

const ItemWrapper = styled.div`
  height: 64px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  & > div:first-child {
    margin-right: 16px;
  }
  ${(p) =>
    p.header &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      pointer-events: none;
    `}
`;

const AccountItem = ({ header, accountName, accountAddress, chain }) => {
  const ss58Format = chainSs58Format[chain];
  let address = accountAddress;
  if (typeof ss58Format === "number") {
    address = encodeAddress(accountAddress, ss58Format);
  }

  return (
    <ItemWrapper header={header}>
      <Avatar address={accountAddress} size={40} />
      <div>
        <Text>{accountName}</Text>
        <TextMinor>
          <Address>{address}</Address>
        </TextMinor>
      </div>
    </ItemWrapper>
  );
};

export default AccountItem;
