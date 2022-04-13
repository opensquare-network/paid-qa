import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";
import NetworkUser from "../User/NetworkUser";

const FlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 8px;
  > :nth-child(5)::before {
    content: "·";
    margin-right: 8px;
    color: #a1a8b3;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const HorizonDivider = styled.div`
  width: 100%;
  flex-shrink: 0;
  height: 1px;
  background: #f0f3f8;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export default function DiscussionItem({ notification, type = "Replied" }) {
  const {
    topic,
    answer,
    answer: { signer, network },
  } = notification.data;

  return (
    <Flex style={{ flexWrap: "wrap" }}>
      <FlexWrapper>
        <span>{type} by</span>
        <NetworkUser
          address={signer}
          network={network}
          iconSize={16}
          tooltipPosition="down"
        />
        <span>in</span>
        <Link to={`/topic/${topic.cid}`}>
          <TextMajor>{topic.title}</TextMajor>
        </Link>
        <Time time={answer.createdAt} />
      </FlexWrapper>
      <HorizonDivider />
      <MicromarkMd md={answer.content} allowTags={["a"]} />
    </Flex>
  );
}
