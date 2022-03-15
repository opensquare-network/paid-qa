import styled from "styled-components";
import { useState, useEffect } from "react";

import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import Avatar from "@osn/common-ui/lib/Account/Avatar";
import { fetchIdentity } from "@osn/common-ui/lib/services/identity";
import ExternalLink from "@osn/common-ui/lib/ExternalLink";
import IdentityIcon from "./IdentityIcon";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import ChainIcon from "./ChainIcon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;
  > :not(:first-child) {
    margin-left: 4px;
  }
  > :first-child {
    margin-right: 4px;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const IdentityWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

function getExplorerLink(network, address) {
  if (network === "statemine") {
    return `https://${network}.statescan.io/account/${address}`;
  } else {
    return `https://${network}.subscan.io/account/${address}`;
  }
}

export default function User({
  address,
  network,
  size = 20,
  showNetwork = false,
}) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const link = getExplorerLink(network, address);

  useEffect(() => {
    if (!address) {
      return;
    }

    fetchIdentity(network, address)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [network, address, isMounted]);

  return (
    <Wrapper>
      <Avatar address={address} size={size} />
      {showNetwork && <ChainIcon chainName={network} size={16} />}
      <ExternalLink href={link}>
        {identity?.info && identity?.info?.status !== "NO_ID" ? (
          <IdentityWrapper>
            <IdentityIcon
              status={identity.info.status}
              showTooltip
              size={showNetwork ? 12 : 14}
            />
            <Name>{identity.info.display}</Name>
          </IdentityWrapper>
        ) : (
          <Name>{addressEllipsis(address)}</Name>
        )}
      </ExternalLink>
    </Wrapper>
  );
}
