import React from "react";
import styled from "styled-components";
import FlexCenter from "../styled/FlexCenter";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled(FlexCenter)`
  background: #ffffff;
  height: 131px;
  ${p_14_normal};
  color: #9da9bb;
`;

export default function NoData({ message = "data" }) {
  return <Wrapper>No current {message}</Wrapper>;
}
