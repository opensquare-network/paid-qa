import styled from "styled-components";

import DividerWrapper from "components/DividerWrapper";
import User from "components/User";
import TagList from "components/TagList";
import Time from "ui/lib/Time";

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

export default function Title({ topic }) {
  return (
    <Wrapper>
      <div>{topic.title}</div>
      <div>
        <DividerWrapper>
          <User address={topic.signer} />
          <Time time={topic.blockTime} />
        </DividerWrapper>
        <TagList />
      </div>
    </Wrapper>
  );
}
