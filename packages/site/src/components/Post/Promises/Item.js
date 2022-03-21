import styled from "styled-components";
import ProgressBar from "components/ProgressBar";
import NetworkUser from "../../User/NetworkUser";
import { useSelector } from "react-redux";
import { fundSummarySelector } from "store/reducers/topicSlice";
import BigNumber from "bignumber.js";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";

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
  const fundSummary = useSelector(fundSummarySelector);
  const paidValue =
    fundSummary?.statsBySponsors?.[reward.sponsor]?.[reward.symbol] || 0;
  const percent = new BigNumber(paidValue)
    .div(reward.value)
    .times(100)
    .integerValue();
  const sponsorAddress = encodeNetworkAddress(reward.society, reward.network);
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <NetworkUser address={sponsorAddress} network={reward.network} />
        <Token>{`${paidValue}/${reward.value} ${reward.symbol}`}</Token>
      </div>
      <ProgressBar percent={percent} />
    </Wrapper>
  );
}
