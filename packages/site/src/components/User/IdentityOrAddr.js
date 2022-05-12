import { useIsMounted } from "@osn/common/src/utils/hooks";
import { useEffect, useState } from "react";
import { fetchIdentity } from "@osn/common/src/services/identity";
import styled, { css } from "styled-components";
import IdentityIcon from "@osn/common-ui/lib/User/IdentityIcon";
import {
  addressEllipsis,
  encodeNetworkAddress,
} from "@osn/common/src/utils/address";
import { identityChainMap } from "@osn/consts";

const IdentityWrapper = styled.a`
  display: flex;
  align-items: center;
  font-weight: 500;

  ${(p) =>
    p.noLink &&
    css`
      pointer-events: none;
    `}
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  & > span {
    margin-right: 4px;
  }
`;

const Name = styled.span`
  line-height: 24px;
`;

export default function IdentityOrAddr({
  address,
  network,
  iconSize,
  tooltipPosition,
  noIcon,
  noLink,
}) {
  const isMounted = useIsMounted();
  const [identity, setIdentity] = useState();

  let ss58Address = address;
  if (address && network) {
    ss58Address = encodeNetworkAddress(address, network);
  }

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

  return (
    <IdentityWrapper
      noLink={noLink}
      href={`/#/network/${network}/address/${ss58Address}`}
    >
      {identity?.info && identity?.info?.status !== "NO_ID" ? (
        <>
          {!noIcon && (
            <IdentityIcon
              status={identity.info.status}
              showTooltip
              size={iconSize}
              position={tooltipPosition}
            />
          )}
          <Name>{identity.info.display}</Name>
        </>
      ) : (
        <Name>{addressEllipsis(ss58Address)}</Name>
      )}
    </IdentityWrapper>
  );
}
