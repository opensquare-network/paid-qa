import styled from "styled-components";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled(FlexCenter)`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  height: 131px;
  ${p_14_normal};
  color: #9da9bb;
`;

export default function NoPost({ message = "No current posts" }) {
  return <Wrapper>{message}</Wrapper>;
}
