import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/es/styled/DividerWrapper";
import TagList from "components/TagList";
import Time from "@osn/common-ui/es/Time";
import MobileInvisible from "@osn/common-ui/es/styled/MobileInvisible";
import NetworkUser from "../../User/NetworkUser";
import { encodeNetworkAddress } from "@osn/common/utils/address";
import { useSelector } from "react-redux";
import { answersSelector } from "../../../store/reducers/answerSlice";
import { p_18_semibold } from "@osn/common-ui/es/styles/textStyles";

const Wrapper = styled.div`
  > :first-child {
    ${p_18_semibold};
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
          <Time time={topic.indexer.blockTime} />
        </DividerWrapper>
        <TagList topic={topic} />
      </div>
    </Wrapper>
  );
}
