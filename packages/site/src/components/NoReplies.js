import styled from "styled-components";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled(FlexCenter)`
  background: #ffffff;
  border-top: 1px solid #f0f3f8;
  border-bottom: 1px solid #f0f3f8;
  height: 131px;
  ${p_14_normal};
  color: #9da9bb;
`;

export default function NoReplies({ message = "No current replies" }) {
  return <Wrapper>{message}</Wrapper>;
}
