import styled from "styled-components";
import Avatar from "@osn/common-ui/lib/Account/Avatar";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import IdentityOrAddr from "./IdentityOrAddr";
import ExternalLink from "@osn/common-ui/lib/ExternalLink";

const Wrapper = styled.span`
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

export default function NetworkUser({
  address,
  network,
  iconSize,
  tooltipPosition,
  link,
}) {
  const identity = (
    <IdentityOrAddr
      address={address}
      network={network}
      iconSize={iconSize}
      tooltipPosition={tooltipPosition}
    />
  );

  let user = identity;
  if (link) {
    user = <ExternalLink href={link}>{identity}</ExternalLink>;
  }

  return (
    <Wrapper>
      <Avatar address={address} size={20} />
      {network && <ChainIcon chainName={network} size={16} />}
      {user}
    </Wrapper>
  );
}
