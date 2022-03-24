import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Time from "@osn/common-ui/lib/Time";
import IpfsSquare from "@osn/common-ui/lib/IpfsSquare";
import NetworkUser from "../../User/NetworkUser";
import ActionBar from "./ActionBar";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

const Wrapper = styled.div`
  padding-top: 20px;
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

const Height = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

export default function Item({ answer, height, onReply }) {
  const signerAddress = encodeNetworkAddress(answer.signer, answer.network);
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <DividerWrapper>
          <NetworkUser
            address={signerAddress}
            network={answer.network}
            tooltipPosition="down"
          />
          <Time time={answer.createdAt} />
        </DividerWrapper>
        <DividerWrapper>
          <Height>#{height}</Height>
          <IpfsSquare
            href={
              answer.pinned ? `https://ipfs.infura.io/ipfs/${answer.cid}` : null
            }
          />
        </DividerWrapper>
      </div>
      <ContentWrapper>
        <MicromarkMd md={answer.content} />
        <ActionBar
          answerCid={answer.cid}
          answerOwner={answer.signer}
          answerNetwork={answer.network}
          funds={answer?.funds}
          onReply={onReply}
        />
      </ContentWrapper>
    </Wrapper>
  );
}
