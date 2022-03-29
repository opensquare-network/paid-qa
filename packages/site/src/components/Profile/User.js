import styled from "styled-components";

import Avatar from "@osn/common-ui/lib/Account/Avatar";
import Name from "../User/Name";
import ExternalLink from "@osn/common-ui/lib/ExternalLink";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";

const Wrapper = styled(Flex)`
  gap: 24px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  > :nth-child(2) {
    > :first-child {
      font-weight: 600;
      line-height: 32px;
    }
    > :nth-child(2) {
      ${p_14_normal};
      color: #506176;
    }
  }
  object > div {
    @media screen and (max-width: ${MOBILE_SIZE}px) {
      justify-content: center;
    }
  }
  a {
    display: block;
  }
`;

const Text = styled.span`
  display: block;
  word-break: break-all;
  text-align: center;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-bottom: 16px;
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
        <Text>{address}</Text>
      </div>
    </Wrapper>
  );
}
