import styled from "styled-components";
import { calcRewards } from "utils/rewards";
import { p_12_medium } from "@osn/common-ui/lib/styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Item = styled.div`
  padding: 2px 12px;
  ${p_12_medium};
  color: #ffffff;
  background: ${(p) => p.color ?? "#E2E8F0"};
  background-color: red !important;
  text-transform: capitalize;
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

function getStatusColor(status) {
  switch (status) {
    case "resolved": {
      return "#E2E8F0";
    }
    case "active": {
      return "#6848FF";
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

  return (
    <Wrapper>
      {
        // Show resolved tag only when the topic is resolved
        topic.status === "resolved" ? (
          <Item color={getStatusColor(topic.status)}>{topic.status}</Item>
        ) : (
          Object.keys(tokenValues).map((symbol) => (
            <Item key={symbol} color={getSymbolColor(symbol)}>
              {`${tokenValues[symbol]} ${symbol}`}
            </Item>
          ))
        )
      }
    </Wrapper>
  );
}
