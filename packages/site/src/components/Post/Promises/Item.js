import styled from "styled-components";
import ProgressBar from "components/ProgressBar";
import NetworkUser from "../../User/NetworkUser";

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
        <NetworkUser address={reward.signer} network={reward.network} />
        <Token>{`0/${reward.value} ${reward.symbol}`}</Token>
      </div>
      <ProgressBar percent={0} />
    </Wrapper>
  );
}
