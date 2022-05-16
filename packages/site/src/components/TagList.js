import styled from "styled-components";
import { calcRewards } from "utils/rewards";
import { Tag } from "@osn/common-ui";
import StatusTag from "./StatusTag";

const Wrapper = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

function getSymbolColor(symbol) {
  switch (symbol) {
    case "KSM": {
      return "#000000";
    }
    case "DOT": {
      return "#E6007A";
    }
    default: {
      return "#000000";
    }
  }
}

export default function TagList({ topic }) {
  if (!topic) {
    return null;
  }
  const tokenValues = calcRewards(topic.rewards);
  const symbol = topic.rewards[0].bounty.symbol;
  return (
    <Wrapper>
      {
        // Show resolved tag only when the topic is resolved
        topic.status === "resolved" ? (
          <StatusTag status={topic.status} />
        ) : (
          <Tag
            key={symbol}
            color={getSymbolColor(symbol)}
          >{`${tokenValues[symbol]} ${symbol}`}</Tag>
        )
      }
    </Wrapper>
  );
}
