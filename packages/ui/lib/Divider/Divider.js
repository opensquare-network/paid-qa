import React from "react";
import styled, { css } from "styled-components";
import { netural_grey_200 } from "../styles/colors";

const DividerWrapper = styled.div`
  height: 1px;
  background-color: ${netural_grey_200};
  ${(p) => css`
    margin: ${p.my || p.gap}px 0;
  `}

  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}

  ${(p) =>
    p.mb &&
    css`
      margin-top: ${p.mb}px;
    `}
`;

/**
 * @param {import('./types').DividerProps} props
 */
function Divider(props) {
  const { my = 20, gap = my, mx, mb, ...restProps } = props ?? {};
  return <DividerWrapper {...restProps} gap={gap} my={my} mt={mt} mb={mb} />;
}

export default Divider;
