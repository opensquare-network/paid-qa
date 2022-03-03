import styled from "styled-components";

import Detail from "./Detail";
import Answers from "./Answers";
import Promises from "./Promises";
import Funds from "./Funds";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  > :first-child {
    flex-grow: 1;
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
  > :nth-child(2) {
    flex: 0 0 300px;
    margin-left: 20px;
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
`;

export default function Post() {
  return (
    <Wrapper>
      <div>
        <Detail />
        <Answers />
      </div>
      <div>
        <Promises />
        <Funds />
      </div>
    </Wrapper>
  );
}
