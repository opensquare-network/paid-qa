import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { Link } from "react-router-dom";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

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

const HorizonDivider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function DiscussionItem({ notification, type = "Replied" }) {
  const {
    topic,
    answer,
    answer: { signer, network },
  } = notification.data;

  return (
    <>
      <FlexWrapper style={{ flexWrap: "wrap" }}>
        {type} by
        <MarginX8>
          <Avatar address={signer} />
        </MarginX8>
        <ChainIcon chainName={network} size={16} />
        <TextMajor style={{ marginLeft: 4 }}>
          {addressEllipsis(signer)}
        </TextMajor>
        <MarginX8>in</MarginX8>
        <Link to={`/topic/${topic.cid}`}>
          <TextMajor>{topic.title}</TextMajor>
        </Link>
      </FlexWrapper>
      <Time time={answer.createdAt} />
      <HorizonDivider />
      {/*todo: strip all syntax, keep plain text only, and <a>*/}
      <MicromarkMd md={answer.content} />
    </>
  );
}
