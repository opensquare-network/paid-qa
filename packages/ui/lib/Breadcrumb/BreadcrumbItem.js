import React from "react";
import styled, { css } from "styled-components";
import { text_dark_accessory } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";

const Wrapper = styled.li`
  list-style: none;
  ${p_16_semibold}
`;

const Item = styled.span`
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  ${(p) =>
    p.disabled &&
    css`
      color: ${text_dark_accessory};
      cursor: unset;

      :hover {
        text-decoration: none;
      }
    `}
`;

const Separator = styled.span`
  margin: 0 8px;
  color: ${text_dark_accessory};
`;

function BreadcrumbItem({ children, disabled, separator = "/", ...rest }) {
  if (children) {
    return (
      <Wrapper>
        <Item disabled={disabled} {...rest}>
          {children}
        </Item>
        {separator && <Separator>{separator}</Separator>}
      </Wrapper>
    );
  }

  return null;
}

export default BreadcrumbItem;
