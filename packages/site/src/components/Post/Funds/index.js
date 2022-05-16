import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFundSummary,
  fundSummarySelector,
  setFundSummary,
} from "store/reducers/topicSlice";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import {
  p_14_medium,
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";

const Title = styled(FlexBetween)`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  ${p_16_semibold};
`;

const ContentWrapper = styled.div`
  margin-top: 16px;
`;

const Item = styled(FlexBetween)`
  ${p_14_medium};
  > :first-child {
    color: #a1a8b3;
  }
  align-items: start;
`;

const GreyText = styled.p`
  color: #a1a8b3;
  text-align: center;
  ${p_14_normal};
`;

const TextRight = styled.div`
  text-align: right;
`;

export default function Funds({ topicCid }) {
  const dispatch = useDispatch();
  const fundSummary = useSelector(fundSummarySelector);
  useEffect(() => {
    if (topicCid) {
      dispatch(fetchFundSummary(topicCid));
    }
    return () => {
      dispatch(setFundSummary(null));
    };
  }, [dispatch, topicCid]);

  const stats = fundSummary?.statsByAnswers;

  return (
    <Card>
      <Title>
        <span>Funds</span>
        <img src="/imgs/icons/treasury.svg" alt="" />
      </Title>
      <ContentWrapper>
        {fundSummary === null && (
          <FlexCenter>
            <Loading />
          </FlexCenter>
        )}
        {fundSummary !== null &&
          (!stats || Object.keys(stats).length === 0) && (
            <GreyText>No funds</GreyText>
          )}
        {Object.keys(stats || {}).map((key, index) => {
          const item = stats[key];
          return (
            <Item key={index}>
              <div>{key === "0" ? "Topic" : `#${key}`}</div>
              <div>
                {Object.keys(item || {}).map((symbol, index) => {
                  return (
                    <TextRight
                      key={index}
                    >{`${item[symbol]} ${symbol}`}</TextRight>
                  );
                })}
              </div>
            </Item>
          );
        })}
      </ContentWrapper>
    </Card>
  );
}
