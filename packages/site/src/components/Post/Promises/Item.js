import styled from "styled-components";

import User from "components/User";
// import ProgressBar from "components/ProgressBar";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 4px;
  }
`;

const Token = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

export default function Item({ reward }) {
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <User />
        <Token>{`${reward.value} ${reward.symbol}`}</Token>
      </div>
      {/* <ProgressBar percent={50} /> */}
    </Wrapper>
  );
}
