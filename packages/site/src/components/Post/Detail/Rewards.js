import styled from "styled-components";

const Wrapper = styled.div`
  > :first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :nth-child(2) {
    margin-top: 1px;
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

export default function Rewards() {
  return (
    <Wrapper>
      <div>Rewards</div>
      <div>10 KSM</div>
    </Wrapper>
  );
}
