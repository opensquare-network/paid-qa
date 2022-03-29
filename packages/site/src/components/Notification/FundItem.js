import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { Link } from "react-router-dom";

const FlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  > :nth-child(5)::after {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function FundItem({ notification, type = "Funded" }) {
  const {
    topic,
    byWho: { address: funder, network },
  } = notification.data;
  let fund = notification.data.fund;
  if (type === "Supported") {
    fund = notification.data.support;
  }
  return (
    <>
      <FlexWrapper style={{ flexWrap: "wrap" }}>
        {type} by
        <MarginX8>
          <Avatar address={funder} />
        </MarginX8>
        <ChainIcon chainName={network} size={16} />
        <TextMajor style={{ marginLeft: 4 }}>
          {addressEllipsis(funder)}
        </TextMajor>
        &nbsp;with&nbsp;
        <TextMajor>
          {fund.value} {fund.symbol}
        </TextMajor>
        &nbsp;in&nbsp;
        <Link to={`/topic/${topic.cid}`}>
          <TextMajor>{topic.title}</TextMajor>
        </Link>
        <Time time={notification.createdAt} />
      </FlexWrapper>
    </>
  );
}
