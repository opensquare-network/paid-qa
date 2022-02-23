import styled from "styled-components";

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
    <Wrapper>
      <img src="/imgs/icons/add.svg" alt="" />
      <div>Ask a Question</div>
    </Wrapper>
  );
}
