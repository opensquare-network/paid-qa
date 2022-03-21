import flatten from "lodash.flatten";
import Avatar from "@osn/common-ui/lib/Account/Avatar";
import styled from "styled-components";
import { calcRewards } from "utils/rewards";
import { useSelector } from "react-redux";
import { fundSummarySelector } from "store/reducers/topicSlice";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Item = styled.div`
  flex-grow: 1;
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

const FunderAvatarList = styled.div`
  display: flex;
`;

export default function Rewards() {
  const fundSummary = useSelector(fundSummarySelector);
  const fundsStats = fundSummary?.statsBySponsors;

  if (!fundsStats || Object.keys(fundsStats).length === 0) {
    return null;
  }

  const sponsors = Array.from(new Set(Object.keys(fundsStats)));
  const funds = Object.keys(fundsStats).map((sponsor) =>
    Object.keys(fundsStats[sponsor]).map((token) => ({
      sponsor,
      symbol: token,
      value: fundsStats[sponsor][token],
    }))
  );

  const tokenValues = calcRewards(flatten(funds));
  return (
    <Wrapper>
      <Item>
        <div>Funders</div>
        <FunderAvatarList>
          {sponsors.map((sponsor) => (
            <Avatar address={sponsor} size={20} />
          ))}
        </FunderAvatarList>
      </Item>
      <Item>
        <div>Rewards</div>
        <div>
          {Object.keys(tokenValues)
            .map((symbol) => `${tokenValues[symbol]} ${symbol}`)
            .join(", ")}
        </div>
      </Item>
    </Wrapper>
  );
}
