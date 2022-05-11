import React from "react";
import styled from "styled-components";
import FlexCenter from "../styled/FlexCenter";
import Card from "../Card";
import { text_dark_accessory } from "../styles/colors";

const Message = styled(FlexCenter)`
  color: ${text_dark_accessory};
  height: 100%;
`;

export default function NoData({ message = "No current data" }) {
  return (
    <Card style={{ height: 130 }}>
      <Message>{message}</Message>
    </Card>
  );
}
