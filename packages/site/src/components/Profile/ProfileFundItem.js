import styled from "styled-components";
import { Flex, Card, Time, ChainIcon, Avatar } from "@osn/common-ui";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import IdentityOrAddr from "../User/IdentityOrAddr";
import {
  text_dark_accessory,
  text_dark_major,
  text_dark_minor,
} from "@osn/common-ui/lib/styles/colors";
import TitleLink from "./styled/TitleLink";
import Dash from "../Dash";

const StyledDividerWrapper = styled(Flex)`
  ${p_14_normal};
  color: ${text_dark_minor};

  > :nth-child(2) {
    font-weight: 500;
    color: ${text_dark_major};
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: ${text_dark_major};
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

const TextAccessory = styled.div`
  color: ${text_dark_accessory};
`;

export default function FundItem({ data }) {
  const topic = data?.topic ?? data?.answer?.topic;

  return (
    <Card size="small">
      <StyledDividerWrapper>
        <span>Funded</span>
        <MarginX8>
          <Avatar address={data?.beneficiary} />
        </MarginX8>
        <ChainIcon chainName={data?.network} size={16} />
        &nbsp;
        <IdentityOrAddr address={data?.beneficiary} network={data?.network} />
        &nbsp;with&nbsp;
        <TextMajor>
          {data?.bounty?.value} {data?.bounty?.symbol}
        </TextMajor>
        &nbsp;in&nbsp;
        <TitleLink to={`/topic/${topic?.cid}`}>
          <TextMajor>{topic?.title}</TextMajor>
        </TitleLink>
        <Dash />
        <TextAccessory>
          <Time time={data?.indexer?.blockTime} />
        </TextAccessory>
      </StyledDividerWrapper>
    </Card>
  );
}
