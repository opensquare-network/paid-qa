import styled from "styled-components";

import DividerWrapper from "ui/lib/styled/DividerWrapper";
import User from "components/User";

const Wrapper = styled.div`
  padding-top: 20px;
`;

const Time = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const ContentWrapper = styled.div`
  margin: 8px 0 0 28px;
  padding-bottom: 20px;
  border-bottom: solid 1px #f0f3f8;
  > :first-child {
    font-size: 14px;
    line-height: 24px;
  }
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Reply = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
  margin-left: 8px;
`;

export default function Item() {
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <DividerWrapper>
          <User />
          <Time>2 days ago</Time>
        </DividerWrapper>
        <img src="/imgs/icons/ipfs.svg" alt="" />
      </div>
      <ContentWrapper>
        <div>
          Mauris cum ac ut eu pellentesque arcu. Habitant cursus porttitor
          feugiat proin. Maecenas enim tristique fermentum parturient nisi,
          nulla sit leo.
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/imgs/icons/reply.svg" alt="" />
            <Reply>Reply</Reply>
          </div>
          <img src="/imgs/icons/more.svg" alt="" />
        </div>
      </ContentWrapper>
    </Wrapper>
  );
}
