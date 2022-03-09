import styled from "styled-components";

const Wrapper = styled.div`
  height: 48px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  > img {
    width: 24px;
    height: 24px;
  }
`;

const Placeholder = styled.div`
  flex: 1 1 auto;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #1E2134;
`;

export default function Select({ placeholder }) {
  return (
    <Wrapper>
      <Placeholder>{placeholder}</Placeholder>
      <img src="/imgs/icons/caret-down.svg" alt="" />
    </Wrapper>
  );
}
