import flatten from "lodash.flatten";
import Avatar from "@osn/common-ui/lib/Account/Avatar";
import styled from "styled-components";
import { calcRewards } from "utils/rewards";
import { useSelector } from "react-redux";
import { fundSummarySelector } from "store/reducers/topicSlice";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Item = styled.div`
  flex-grow: 1;
  > :first-child {
    ${p_16_semibold};
  }
  > :nth-child(2) {
    margin-top: 1px;
    ${p_14_normal};
    color: #506176;
  }
`;

const FunderAvatarList = styled.div`
  display: flex;
  > div:not(:first-child) {
    position: relative;
  }
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
          {sponsors.map((sponsor, index) => (
            <div key={index} style={{ left: -index * 10 }}>
              <Avatar address={sponsor} size={20} />
            </div>
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
