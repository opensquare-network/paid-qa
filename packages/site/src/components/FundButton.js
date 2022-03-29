import styled, { css } from "styled-components";
import { ReactComponent as ExpandDownIcon } from "imgs/icons/expand-down.svg";
import { ReactComponent as ExpandUpIcon } from "imgs/icons/expand-up.svg";
import { ReactComponent as FundIcon } from "imgs/icons/fund.svg";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";

const Wrapper = styled(Flex)`
  > :first-child {
    margin-right: 8px;
  }
`;

const Text = styled.span`
  ${p_14_normal};
`;

const Fund = styled(Flex)`
  pointer-events: none;
  > :first-child {
    margin-right: 8px;
  }

  color: #a1a8b3;
  ${(p) =>
    !p.disabled &&
    css`
      pointer-events: auto;
      cursor: pointer;
      :hover {
        color: #506176;
        > svg path {
          fill: #506176;
        }
      }
    `}
`;

const Expand = styled(Flex)`
  cursor: pointer;
`;

export default function FundButton({
  text,
  expand,
  setExpand,
  onFund,
  canExpand,
  disabled,
}) {
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
