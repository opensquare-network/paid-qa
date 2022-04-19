import styled from "styled-components";
import { MOBILE_SIZE } from "@osn/common/src/utils/constants";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
  > div {
    margin-bottom: 20px;
    padding: 24px;
    @media screen and (max-width: ${MOBILE_SIZE}px) {
      padding: 16px;
    }
  }
  a {
    :hover {
      text-decoration: underline;
    }
    cursor: pointer;
  }

  > div > div {
    > div {
      flex-wrap: wrap;
    }
    flex-wrap: wrap;
  }
`;

export default Wrapper;
