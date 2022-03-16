import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { useEffect, useState } from "react";
import { fetchIdentity } from "@osn/common-ui/lib/services/identity";
import styled from "styled-components";
import IdentityIcon from "./IdentityIcon";
import { addressEllipsis } from "./ConnectedAccount";

const IdentityWrapper = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;

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
}) {
  const isMounted = useIsMounted();
  const [identity, setIdentity] = useState();

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
      .catch(console.error);
  }, [network, address, isMounted]);

  return (
    <IdentityWrapper>
      {identity?.info && identity?.info?.status !== "NO_ID" ? (
        <>
          <IdentityIcon
            status={identity.info.status}
            showTooltip
            size={iconSize}
            position={tooltipPosition}
          />
          <Name>{identity.info.display}</Name>
        </>
      ) : (
        <Name>{addressEllipsis(address)}</Name>
      )}
    </IdentityWrapper>
  );
}
