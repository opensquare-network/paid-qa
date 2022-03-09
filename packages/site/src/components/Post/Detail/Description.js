import styled from "styled-components";
import IpfsSquare from "ui/lib/IpfsSquare";

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
`;

export default function Description({ topic }) {
  return (
    <Wrapper>
      <div>
        <div>Description</div>
        <IpfsSquare href={topic.pinned ? `https://ipfs.infura.io/ipfs/${topic.cid}` : null} />
      </div>
      <div>{topic.content}</div>
    </Wrapper>
  );
}
