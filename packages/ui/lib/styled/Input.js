import styled from "styled-components";
import { p_14_normal } from "../styles/textStyles";

const styledInput = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: 12px 16px;
  width: 100%;
  background: #fbfcfe;
  border-bottom: 1px solid #e2e8f0;
  :hover,
  :focus,
  :active {
    border-color: #b7c0cc;
  }
  ${p_14_normal};
  color: #1e2134;
  ::placeholder {
    color: #9da9bb;
  }
`;

export default styledInput;
