import styled from "styled-components";
import { calcRewards } from "utils/rewards";
import { Tag } from "@osn/common-ui";
import StatusTag from "./StatusTag";
import { primary_purple_500 } from "@osn/common-ui/lib/styles/colors";

const Wrapper = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const symbolColorMap = {
  KSM: "#000000",
  DOT: "#E6007A",
  OSNT: primary_purple_500,
  WND: "linear-gradient(90.04deg, rgba(247, 148, 32, 0.92) 2.41%, rgba(196, 196, 196, 0) 164.5%), #E6007A",
};
const getSymbolColor = (symbol) => symbolColorMap[symbol] || "#000000";

export default function TagList({ topic }) {
  if (!topic) {
    return null;
  }
  const tokenValues = calcRewards(topic.rewards);
  const symbol = topic.rewards[0]?.bounty.symbol;
  return (
    <Wrapper>
      {
        // Show resolved tag only when the topic is resolved
        topic.resolved ? (
          <StatusTag status={"resolved"} />
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
