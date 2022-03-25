import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";

const Wrapper = styled(Card)`
  ${p_14_normal};
  color: #506176;
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function FundItem({ notification }) {
  const signer = notification.data.byWho.signer;
  const network = notification.data.byWho.network;
  return (
    <Wrapper>
      <DividerWrapper>
        <Flex>
          Rewarded by
          <MarginX8>
            <Avatar address={signer} />
          </MarginX8>
          <ChainIcon chainName={network} size={16} />
          <TextMajor style={{ marginLeft: 4 }}>
            {addressEllipsis(signer)}
          </TextMajor>
          <MarginX8>with</MarginX8>
          <TextMajor>{notification.data.fund.amount} {notification.data.fund.symbol}</TextMajor>
          <MarginX8>in</MarginX8>
          <TextMajor>{notification.data.topic.title}</TextMajor>
        </Flex>
        <Time time={notification.data.fund.blockTime} />
      </DividerWrapper>
    </Wrapper>
  );
}
