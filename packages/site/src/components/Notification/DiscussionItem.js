import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { Link } from "react-router-dom";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

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
  const signer = notification.data.answer.signer;
  const network = notification.data.answer.network;
  const topic = notification.data.topic;
  const answer = notification.data.answer;
  return (
    <>
      <DividerWrapper>
        <Flex>
          {type} by
          <MarginX8>
            <Avatar address={signer} />
          </MarginX8>
          <ChainIcon chainName={network} size={16} />
          <TextMajor style={{ marginLeft: 4 }}>
            {addressEllipsis(signer)}
          </TextMajor>
          &nbsp;in&nbsp;
          <Link to={`/topic/${topic.cid}`}>
            <TextMajor>{topic.title}</TextMajor>
          </Link>
        </Flex>
        <Time time={answer.createdAt} />
      </DividerWrapper>
      <HorizonDivider />
      {/*todo: strip all syntax, keep plain text only, and <a>*/}
      <MicromarkMd md={answer.content} />
    </>
  );
}
