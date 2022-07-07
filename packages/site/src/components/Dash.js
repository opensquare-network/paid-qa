import { text_dark_accessory } from "@osn/common-ui/es/styles/colors";
import styled from "styled-components";

const Span = styled.span`
  margin: 0 8px;
  color: ${text_dark_accessory};
`;

export default function Dash() {
  return <Span>·</Span>;
}
