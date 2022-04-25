import React from "react";
import styled, { css } from "styled-components";
import { p_12_medium } from "../styles/textStyles";

const colors = {
  active: "#6848FF",
  resolved: "#E2E8F0",
};

const Wrapper = styled.span`
  padding: 2px 12px;
  color: white;
  line-height: 16px;
  font-size: 12px;
  ${p_12_medium}
  background-color: ${(p) => colors[p.status] || p.color || "#000"};
  ${(p) =>
    p.status &&
    css`
      text-transform: capitalize;
    `}
`;

export default function Tag({ children, status = "", color }) {
  return (
    <Wrapper status={status} color={color}>
      {status || children}
    </Wrapper>
  );
}
