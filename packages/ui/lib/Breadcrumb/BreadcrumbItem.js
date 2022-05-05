import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { text_dark_accessory } from "../styles/colors";

const Item = styled.li`
  list-style: none;

  ${(p) =>
    p.disabled &&
    css`
      color: ${text_dark_accessory};
    `}
`;

const Separator = styled.span`
  margin: 0 8px;
  color: ${text_dark_accessory};
`;

function BreadcrumbItem({ children, disabled, separator = "/" }) {
  if (children) {
    return (
      <Item disabled={disabled}>
        {children}
        {separator && <Separator>{separator}</Separator>}
      </Item>
    );
  }

  return null;
}

export default BreadcrumbItem;
