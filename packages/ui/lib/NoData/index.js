import React from "react";
import styled from "styled-components";
import FlexCenter from "../styled/FlexCenter";
import Card from "../Card";
import { text_dark_accessory } from "../styles/colors";

const Message = styled(FlexCenter)`
  color: ${text_dark_accessory};
  height: 66px;
`;

export default function NoData({ message = "No current data" }) {
  return (
    <Card>
      <Message>{message}</Message>
    </Card>
  );
}
