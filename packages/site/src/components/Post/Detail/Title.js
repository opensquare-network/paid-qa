import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import TagList from "components/TagList";
import Time from "@osn/common-ui/lib/Time";
import MobileInvisible from "components/MobileInvisible";
import NetworkUser from "../../User/NetworkUser";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";
import { useSelector } from "react-redux";
import { answersSelector } from "../../../store/reducers/answerSlice";

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
  const answers = useSelector(answersSelector);
  const signerAddress = encodeNetworkAddress(topic.signer, topic.network);
  return (
    <Wrapper>
      <div>{topic.title}</div>
      <div>
        <DividerWrapper>
          <MobileInvisible>
            <NetworkUser
              address={signerAddress}
              network={topic.network}
              tooltipPosition="down"
            />
          </MobileInvisible>
          <RepliesCount>{answers?.total || 0} Replies</RepliesCount>
          <Time time={topic.blockTime} />
        </DividerWrapper>
        <TagList topic={topic} />
      </div>
    </Wrapper>
  );
}
