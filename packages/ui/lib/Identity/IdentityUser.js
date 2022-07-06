// low-level component

import styled from "styled-components";
import IdentityIcon from "./IdentityIcon";
import ChainIcon from "../Chain/ChainIcon";
import Avatar from "../Account/Avatar";
import React, { useEffect, useState } from "react";
import { fetchIdentity } from "@osn/common/src/services/identity";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { identityChainMap } from "@osn/constants";
import { addressEllipsis } from "@osn/common/src/utils/address";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
`;

const AvatarIconWrapper = styled.span`
  display: inline-flex;
  margin-right: 8px;
`;
const NetworkIconWrapper = styled.span`
  margin-right: 4px;
`;
const IdentityIconWrapper = styled.span`
  margin-right: 4px;
`;

function defaultTextRender(text) {
  return text;
}

export default function IdentityUser({
  address,
  network,
  items = ["avatarIcon", "networkIcon", "identityIcon", "text"],
  textRender = defaultTextRender,
  avatarIconSize = 20,
  networkIconSize = 16,
  identityIconSize = 12,
  identityTooltipPosition,
}) {
  const isMounted = useIsMounted();
  const [identity, setIdentity] = useState({});

  const assertItems = (key) => items.includes(key);

  useEffect(() => {
    if (!address || !network) {
      return;
    }
    const identityChain = identityChainMap[network] || network;
    fetchIdentity(identityChain, address)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(console.error);
  }, [network, address, isMounted]);

  let avatarIcon;
  if (assertItems("avatarIcon")) {
    avatarIcon = (
      <AvatarIconWrapper>
        <Avatar address={address} size={avatarIconSize} />
      </AvatarIconWrapper>
    );
  }
  let networkIcon;
  if (assertItems("networkIcon")) {
    networkIcon = network && (
      <NetworkIconWrapper>
        <ChainIcon chainName={network} size={networkIconSize} />
      </NetworkIconWrapper>
    );
  }
  let identityIcon;
  if (assertItems("identityIcon")) {
    if (identity?.info && identity?.info?.status !== "NO_ID") {
      identityIcon = (
        <IdentityIconWrapper>
          <IdentityIcon
            status={identity?.info?.status}
            showTooltip
            size={identityIconSize}
            position={identityTooltipPosition}
          />
        </IdentityIconWrapper>
      );
    }
  }
  let text;
  if (assertItems("text")) {
    text = textRender(identity?.info?.display ?? addressEllipsis(address));
  }

  return (
    <Wrapper>
      {avatarIcon}
      {networkIcon}
      {identityIcon}
      {text}
    </Wrapper>
  );
}
