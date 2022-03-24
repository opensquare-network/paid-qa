import styled from "styled-components";
import IpfsSquare from "@osn/common-ui/lib/IpfsSquare";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";
import ActionBar from "./ActionBar";

const Wrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :nth-child(2) {
    margin-top: 16px;
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
  > :nth-child(3) {
    margin-top: 15px;
  }
`;

export default function Description({ topic }) {
  return (
    <Wrapper>
      <div>
        <div>Description</div>
        <IpfsSquare
          href={
            topic.pinned ? `https://ipfs.infura.io/ipfs/${topic.cid}` : null
          }
        />
      </div>
      <MicromarkMd md={topic.content} />
      <ActionBar
        topicCid={topic.cid}
        topicOwner={topic.signer}
        funds={topic?.funds}
      />
    </Wrapper>
  );
}
