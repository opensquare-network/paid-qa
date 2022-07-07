import styled from "styled-components";
import { Flex, Card, Time, ChainIcon, Avatar } from "@osn/common-ui";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { Link } from "react-router-dom";
import IdentityOrAddr from "../User/IdentityOrAddr";
import {
  text_dark_accessory,
  text_dark_major,
  text_dark_minor,
} from "@osn/common-ui/lib/styles/colors";

const StyledDividerWrapper = styled(Flex)`
  ${p_14_normal};
  color: ${text_dark_minor};

  > :nth-child(2) {
    font-weight: 500;
    color: ${text_dark_major};
  }

  > :nth-child(6)::after {
    content: "·";
    margin: 0 8px;
    color: ${text_dark_accessory};
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

const TitleLink = styled(Link)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
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
        <TextAccessory>
          <Time time={data?.indexer?.blockTime} />
        </TextAccessory>
      </StyledDividerWrapper>
    </Card>
  );
}
