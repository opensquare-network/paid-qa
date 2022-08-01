import styled from "styled-components";
import { Link } from "react-router-dom";

import TagList from "./TagList";
import DividerWrapper from "@osn/common-ui/es/styled/DividerWrapper";
import MobileInvisible from "@osn/common-ui/es/styled/MobileInvisible";
import MobileVisible from "@osn/common-ui/es/styled/MobileVisible";
import NetworkUser from "./User/NetworkUser";
import { encodeNetworkAddress } from "@osn/common/src/utils/address";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/es/styles/textStyles";
import { Card, Time, FlexCenter } from "@osn/common-ui";

const ReplyWrapper = styled(FlexCenter)`
  width: 80px;
  height: 80px;
  flex-direction: column;
  border: 1px solid #f0f3f8;
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

  &:hover {
    text-decoration: underline;
  }
`;

const RepliesCount = styled.div`
  color: #a1a8b3;
`;

export default function Topic({ topic }) {
  const signerAddress = encodeNetworkAddress(topic?.signer, topic?.network);

  return (
    <Card
      size="small"
      prefix={
        <MobileInvisible>
          <ReplyWrapper>
            <div>{topic?.answersCount || 0}</div>
            <div>Replies</div>
          </ReplyWrapper>
        </MobileInvisible>
      }
      head={<Title to={`/topic/${topic?.cid}`}>{topic?.title}</Title>}
    >
      <DetailWrapper>
        <div>
          <DividerWrapper>
            <MobileInvisible>
              <NetworkUser
                address={signerAddress}
                network={topic?.network}
                iconSize={14}
                tooltipPosition="down"
              />
            </MobileInvisible>
            <MobileVisible>
              <RepliesCount>{topic?.answersCount || 0} Replies</RepliesCount>
            </MobileVisible>
            <Time time={topic?.indexer?.blockTime} />
          </DividerWrapper>
          <TagList topic={topic} />
        </div>
      </DetailWrapper>
    </Card>
  );
}
