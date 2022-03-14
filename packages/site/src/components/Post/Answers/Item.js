import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import User from "components/User";
import Time from "@osn/common-ui/lib/Time";
import IpfsSquare from "@osn/common-ui/lib/IpfsSquare";

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

export default function Item({ answer }) {
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <DividerWrapper>
          <User address={answer.signer} network={answer.network} showNetwork />
          <Time time={answer.createdAt} />
        </DividerWrapper>
        <IpfsSquare
          href={
            answer.pinned ? `https://ipfs.infura.io/ipfs/${answer.cid}` : null
          }
        />
      </div>
      <ContentWrapper>
        <div>{answer.content}</div>
      </ContentWrapper>
    </Wrapper>
  );
}
