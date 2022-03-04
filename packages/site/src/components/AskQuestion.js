import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #04d2c5;
  cursor: pointer;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;

export default function AskQuestion() {
  return (
    <Link to={"/askquestion"}>
      <Wrapper>
        <img src="/imgs/icons/add.svg" alt="" />
        <div>Ask a Question</div>
      </Wrapper>
    </Link>
  );
}
