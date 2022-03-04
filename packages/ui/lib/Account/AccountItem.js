import React from "react";
import styled, { css } from "styled-components";

import Avatar from "./Avatar";
import Address from "./Address";
import { encodeAddress } from "@polkadot/util-crypto";
import { ChainSS58Format } from "ui/lib/utils/constants";

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
  const ss58Format = ChainSS58Format[chain];
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
