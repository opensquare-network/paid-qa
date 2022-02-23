import styled from "styled-components";

import Card from "components/Card";
import Detail from "./Detail";

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
        <Card />
      </div>
      <div>
        <Card />
        <Card />
      </div>
    </Wrapper>
  );
}
