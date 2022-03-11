import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import User from "components/User";
import TagList from "components/TagList";
import Time from "@osn/common-ui/lib/Time";
import MobileInvisible from "components/MobileInvisible";

const Wrapper = styled.div`
  > :first-child {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
  > :nth-child(2) {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const RepliesCount = styled.span`
  color: #a1a8b3;
`;

export default function Title({ topic }) {
  return (
    <Wrapper>
      <div>{topic.title}</div>
      <div>
        <DividerWrapper>
          <MobileInvisible>
            <User address={topic.signer} network={topic.network} showNetwork />
          </MobileInvisible>
          <RepliesCount>{topic.replies?.length || 0} Replies</RepliesCount>
          <Time time={topic.blockTime} />
        </DividerWrapper>
        <TagList topic={topic} />
      </div>
    </Wrapper>
  );
}
