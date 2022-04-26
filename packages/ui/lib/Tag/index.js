import React from "react";
import styled from "styled-components";
import { p_12_medium } from "../styles/textStyles";

const presetColors = {
  purple: "#6848FF",
  gray: "#E2E8F0",
  turquoise: "#04D2C5",
};

const Wrapper = styled.span`
  padding: 2px 12px;
  color: white;
  line-height: 16px;
  font-size: 12px;
  ${p_12_medium}
  background-color: ${(p) => presetColors[p.color] || p.color || "#000"};
`;

export default function Tag({ children, color = "" }) {
  return <Wrapper color={color}>{children}</Wrapper>;
}
