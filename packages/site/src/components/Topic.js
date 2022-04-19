import styled from "styled-components";
import { Link } from "react-router-dom";

import TagList from "./TagList";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import MobileInvisible from "@osn/common-ui/lib/styled/MobileInvisible";
import MobileVisible from "@osn/common-ui/lib/styled/MobileVisible";
import Time from "@osn/common-ui/lib/Time";
import NetworkUser from "./User/NetworkUser";
import { encodeNetworkAddress } from "@osn/common/src/utils/address";
import { MOBILE_SIZE } from "@osn/common/src/utils/constants";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled.div`
  padding: 24px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding: 16px;
  }
  display: flex;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  color: #1e2134;
  margin-bottom: 20px;
`;

const ReplyWrapper = styled(FlexCenter)`
  width: 80px;
  height: 80px;
  flex-direction: column;
  border: 1px solid #f0f3f8;
  margin-right: 24px;
  flex: 0 0 auto;
  > :first-child {
    ${p_20_semibold};
  }
  > :nth-child(2) {
    ${p_14_normal};
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
  ${p_16_semibold};
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  margin: 16px 0;
  background: #f0f3f8;
`;

const RepliesCount = styled.div`
  color: #a1a8b3;
`;

export default function Topic({ topic }) {
  const signerAddress = encodeNetworkAddress(topic.signer, topic.network);
  return (
    <Wrapper>
      <MobileInvisible>
        <ReplyWrapper>
          <div>{topic.answersCount || 0}</div>
          <div>Replies</div>
        </ReplyWrapper>
      </MobileInvisible>
      <DetailWrapper>
        <Title to={`/topic/${topic.cid}`}>{topic.title}</Title>
        <Divider />
        <div>
          <DividerWrapper>
            <MobileInvisible>
              <NetworkUser
                address={signerAddress}
                network={topic.network}
                iconSize={14}
                tooltipPosition="down"
              />
            </MobileInvisible>
            <MobileVisible>
              <RepliesCount>{topic.answersCount || 0} Replies</RepliesCount>
            </MobileVisible>
            <Time time={topic.blockTime} />
          </DividerWrapper>
          <TagList topic={topic} />
        </div>
      </DetailWrapper>
    </Wrapper>
  );
}
