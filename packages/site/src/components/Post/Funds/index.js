import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFundSummary,
  fundSummarySelector,
} from "store/reducers/topicSlice";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ContentWrapper = styled.div`
  margin-top: 16px;
`;

const Item = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > :first-child {
    color: #a1a8b3;
  }
`;

const GreyText = styled.p`
  color: #a1a8b3;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
`;

export default function Funds({ topicCid }) {
  const dispatch = useDispatch();
  const fundSummary = useSelector(fundSummarySelector);
  useEffect(() => {
    if (topicCid) {
      dispatch(fetchFundSummary(topicCid));
    }
  }, [dispatch, topicCid]);

  const stats = fundSummary?.statsByAnswers;

  return (
    <Card>
      <Title className="flex items-center justify-between">
        <div>Funds</div>
        <img src="/imgs/icons/treasury.svg" alt="" />
      </Title>
      <ContentWrapper>
        {(!stats || Object.keys(stats).length === 0) && (
          <GreyText>No funds</GreyText>
        )}
        {Object.keys(stats || {}).map((key, index) => {
          const item = stats[key];
          return (
            <Item key={index}>
              <div>{key === "0" ? "Topic" : `#${key}`}</div>
              <div>
                {Object.keys(item || {}).map((symbol, index) => {
                  return <div key={index}>{`${item[symbol]} ${symbol}`}</div>;
                })}
              </div>
            </Item>
          );
        })}
      </ContentWrapper>
    </Card>
  );
}
