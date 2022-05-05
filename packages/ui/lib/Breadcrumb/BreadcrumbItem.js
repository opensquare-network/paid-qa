import React from "react";
import styled, { css } from "styled-components";
import { text_dark_accessory } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";

const Item = styled.li`
  list-style: none;
  ${p_16_semibold}
  cursor: pointer;
  :hover {
    .content {
      text-decoration: underline;
    }
  }

  ${(p) =>
    p.disabled &&
    css`
      color: ${text_dark_accessory};
      cursor: unset;
      :hover {
        .content {
          text-decoration: none;
        }
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
      <Item disabled={disabled} {...rest}>
        <span className="content">{children}</span>
        {separator && <Separator>{separator}</Separator>}
      </Item>
    );
  }

  return null;
}

export default BreadcrumbItem;
