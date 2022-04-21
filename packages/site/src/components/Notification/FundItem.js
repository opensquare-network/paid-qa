import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import NetworkUser from "../User/NetworkUser";

const FlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 8px;
  > :nth-child(4)::before {
    content: "·";
    margin-right: 8px;
    color: #a1a8b3;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
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
      <FlexWrapper>
        {type} by
        <NetworkUser
          address={funder}
          network={network}
          iconSize={16}
          tooltipPosition="down"
        />
        with
        <TextMajor>
          {fund?.value} {fund?.symbol}
        </TextMajor>
        in
        <Link to={`/topic/${topic.cid}`}>
          <TextMajor>{topic.title}</TextMajor>
        </Link>
        <Time time={notification.createdAt} />
      </FlexWrapper>
    </>
  );
}
