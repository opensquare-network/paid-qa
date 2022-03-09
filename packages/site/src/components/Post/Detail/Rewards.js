import styled from "styled-components";
import { calcRewards } from "utils/rewards";

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

export default function Rewards({ rewards }) {
  const tokenValues = calcRewards(rewards);
  return (
    <Wrapper>
      <div>Rewards</div>
      <div>
        {Object.keys(tokenValues).map(symbol => `${tokenValues[symbol]} ${symbol}`).join(", ")}
      </div>
    </Wrapper>
  );
}
