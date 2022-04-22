import React from "react";
import styled from "styled-components";
import FlexCenter from "../styled/FlexCenter";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled(FlexCenter)`
  background: #ffffff;
  height: 131px;
  ${p_14_normal};
  color: #9da9bb;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
`;

export default function NoData({ message = "No current data" }) {
  return <Wrapper>{message}</Wrapper>;
}
