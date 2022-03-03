import styled from "styled-components";

import DividerWrapper from "components/DividerWrapper";
import User from "components/User";
import TagList from "components/TagList";

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

const Time = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

export default function Title() {
  return (
    <Wrapper>
      <div>What tool we should use to measure effectiveness of PH Launch?</div>
      <div>
        <DividerWrapper>
          <User />
          <Time>2 hours ago</Time>
        </DividerWrapper>
        <TagList />
      </div>
    </Wrapper>
  );
}
