import styled from "styled-components";
import { Link } from "react-router-dom";

import TagList from "./TagList";
import User from "components/User";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import MobileInvisible from "components/MobileInvisible";
import Time from "@osn/common-ui/lib/Time";

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  color: #1e2134;
  margin-bottom: 20px;
`;

const ReplyWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f3f8;
  margin-right: 24px;
  flex: 0 0 auto;
  > :first-child {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
  > :nth-child(2) {
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

const DetailWrapper = styled.div`
  flex-grow: 1;
  > :last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  margin: 16px 0;
  background: #f0f3f8;
`;

const RepliesCount = styled.span`
  color: #a1a8b3;
`;

export default function Topic({ topic }) {
  return (
    <Wrapper>
      <MobileInvisible>
        <ReplyWrapper>
          <div>0</div>
          <div>Replies</div>
        </ReplyWrapper>
      </MobileInvisible>
      <DetailWrapper>
        <Title to={`/topic/${topic.cid}`}>{topic.title}</Title>
        <Divider />
        <div>
          <DividerWrapper>
            <MobileInvisible>
              <User
                address={topic.signer}
                network={topic.network}
                showNetwork
              />
            </MobileInvisible>
            <RepliesCount>{topic.replies?.length || 0} Replies</RepliesCount>
            <Time time={topic.blockTime} />
          </DividerWrapper>
          <TagList topic={topic} />
        </div>
      </DetailWrapper>
    </Wrapper>
  );
}
