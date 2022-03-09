import styled from "styled-components";
import { MOBILE_SIZE } from "../utils/constants";

const maxWidth = 1080;

const Main = styled.main`
  flex: 1 1 auto;

  @media screen and (min-width: ${MOBILE_SIZE}px) and (max-width: ${maxWidth}px) {
    padding: 0 32px;
  }

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding: 0 16px;
  }
`;

export default Main;
