import styled from "styled-components";
import { bnAdd } from "ui/lib/utils/tokenValue";

const Wrapper = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Item = styled.div`
  padding: 2px 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: ${(p) => p.color ?? "#E2E8F0"};
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
  const tokenValues = {};
  topic.rewards?.forEach((reward) => {
    tokenValues[reward.symbol] = bnAdd(tokenValues[reward.symbol] ?? "0", reward.value);
  });

  return (
    <Wrapper>
      <Item color={getStatusColor(topic.status)}>{topic.status}</Item>
      {Object.keys(tokenValues).map(symbol => (
        <Item key={symbol} color={getSymbolColor(symbol)}>
          {`${tokenValues[symbol]} ${symbol}`}
        </Item>
      ))}
    </Wrapper>
  );
}
