import styled, { css } from "styled-components";
import { ReactComponent as ExpandDownIcon } from "imgs/icons/expand-down.svg";
import { ReactComponent as ExpandUpIcon } from "imgs/icons/expand-up.svg";
import { ReactComponent as FundIcon } from "imgs/icons/fund.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 8px;
  }
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

const Fund = styled.button`
  display: flex;
  align-items: center;
  pointer-events: none;
  > :first-child {
    margin-right: 8px;
  }

  color: #a1a8b3;
  ${
    p => !p.disabled && css`
      pointer-events: auto;
      cursor: pointer;
      :hover {
        color: #506176;
        > svg path {
          fill: #506176;
        }
      }
    `
  }
`;

const Expand = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export default function FundButton({ text, expand, setExpand, onFund, canExpand, disabled }) {
  return (
    <Wrapper>
      <Fund disabled={disabled} onClick={onFund}>
        <FundIcon />
        <Text>{text}</Text>
      </Fund>
      {canExpand && (
        <Expand onClick={() => setExpand(!expand)}>
          {expand ? <ExpandUpIcon /> : <ExpandDownIcon />}
        </Expand>
      )}
    </Wrapper>
  );
}
