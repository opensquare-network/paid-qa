import React from "react";
import styled, { css } from "styled-components";
import { netural_grey_200 } from "../styles/colors";

const DividerWrapper = styled.div`
  height: 1px;
  background-color: ${netural_grey_200};
  ${(p) => css`
    margin: ${p.gap}px 0;
  `}
`;

/**
 * @param {import('./types').DividerProps} props
 */
function Divider(props) {
  const { gap = 20, ...restProps } = props;
  return <DividerWrapper {...restProps} gap={gap} />;
}

export default Divider;
