import styled from "styled-components";
import { MOBILE_SIZE } from "../utils/constants";

const MobileInvisible = styled.div`
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
  }
`;

export default MobileInvisible;
