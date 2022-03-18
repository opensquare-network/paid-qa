import ChainIcon from "./ChainIcon";
import styled, { css } from "styled-components";
import { p_14_medium } from "../styles/textStyles";

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: #1e2134;
  margin: 0;
`;

const ItemWrapper = styled.div`
  height: 48px;
  padding: 12px 16px;
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 16px;
  }

  ${(p) =>
    p.header &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    `}
  img, svg {
    margin-right: 8px;
  }
`;

const ChainItem = ({ header, chainName }) => {
  return (
    <ItemWrapper header={header}>
      <ChainIcon chainName={chainName} />
      <div>
        <Text>{chainName}</Text>
      </div>
    </ItemWrapper>
  );
};

export default ChainItem;
