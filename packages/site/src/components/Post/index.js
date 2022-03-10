import styled from "styled-components";

import Detail from "./Detail";
// import Answers from "./Answers";
import Promises from "./Promises";
// import Funds from "./Funds";
import { MOBILE_SIZE } from "utils/constants";


const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  > :first-child {
    flex-grow: 1;
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
  > :nth-child(2) {
    @media screen and (min-width: ${MOBILE_SIZE}px) {
      margin-left: 20px;
      flex: 0 0 300px;
    }
    @media screen and (max-width: ${MOBILE_SIZE}px) {
      margin-top: 20px;
      flex-grow: 1;
    }
    > :not(:first-child) {
      margin-top: 20px;
    }
  }

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin: 0 -16px;
  }
`;

export default function Post({ topic }) {
  return (
    <Wrapper>
      <div>
        <Detail topic={topic} />
        {/* <Answers /> */}
      </div>
      <div>
        <Promises rewards={topic.rewards} />
        {/* <Funds /> */}
      </div>
    </Wrapper>
  );
}
