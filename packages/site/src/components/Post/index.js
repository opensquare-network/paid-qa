import styled from "styled-components";

import Detail from "./Detail";
import Answers from "./Answers";
import Promises from "./Promises";
import Funds from "./Funds";
import { MOBILE_SIZE } from "utils/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    flex-wrap: wrap;
  }

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
      flex-basis: 100%;
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
        <Answers topicCid={topic?.cid} />
      </div>
      <div>
        <Promises topicCid={topic?.cid} rewards={topic?.rewards} resolves={topic?.resolves} />
        <Funds topicCid={topic?.cid} />
      </div>
    </Wrapper>
  );
}
