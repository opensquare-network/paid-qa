import styled from "styled-components";
import ProgressBar from "components/ProgressBar";
import NetworkUser from "../../User/NetworkUser";
import { useSelector } from "react-redux";
import { fundSummarySelector } from "store/reducers/topicSlice";
import BigNumber from "bignumber.js";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Token = styled.span`
  ${p_14_medium};
`;

const Label = styled.span`
  ${p_14_medium};
  color: #a1a8b3;
`;

const ResolvedTag = styled(FlexCenter)`
  padding: 2px 8px;
  width: 61px;
  height: 18px;
  border: 1px solid #b7c0cc;
  box-sizing: border-box;
  border-radius: 9px;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #a1a8b3;
`;

export function useFulfillment(reward) {
  const fundSummary = useSelector(fundSummarySelector);
  if (!reward) {
    return [0, 0];
  }

  const paidValue =
    fundSummary?.statsBySponsors?.[reward.sponsor]?.[reward.symbol] || 0;
  const percent = new BigNumber(paidValue)
    .div(reward.value)
    .times(100)
    .integerValue();
  return [paidValue, Math.max(0, Math.min(percent, 100))];
}

export default function Item({ reward, resolve }) {
  const [paidValue, percent] = useFulfillment(reward);
  const sponsorAddress = encodeNetworkAddress(reward.sponsor, reward.network);
  return (
    <Wrapper>
      <FlexBetween>
        <NetworkUser address={sponsorAddress} network={reward.network} />
        {resolve && <ResolvedTag>Resolved</ResolvedTag>}
      </FlexBetween>
      {!resolve && (
        <>
          <ProgressBar percent={percent} />
          <FlexBetween>
            <Label>Fund</Label>
            <Token>{`${paidValue}/${reward.value} ${reward.symbol}`}</Token>
          </FlexBetween>
        </>
      )}
    </Wrapper>
  );
}
