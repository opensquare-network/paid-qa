import styled from "styled-components";

import Avatar from "@osn/common-ui/lib/Account/Avatar";
import Name from "../User/Name";
import ExternalLink from "@osn/common-ui/lib/ExternalLink";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :nth-child(2) {
    margin-left: 24px;
    > :first-child {
      font-weight: 600;
      line-height: 32px;
    }
    > :nth-child(2) {
      font-size: 14px;
      line-height: 24px;
      color: #506176;
    }
  }
`;

export default function Profile({ network, address }) {
  return (
    <Wrapper>
      <Avatar address={address} size={64} />
      <div>
        <ExternalLink href={`https://${network}.subscan.io/account/${address}`}>
          <object>
            <Name network={network} address={address} noLink={true} />
          </object>
        </ExternalLink>
        <div>{address}</div>
      </div>
    </Wrapper>
  );
}
