import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Item = styled.div`
  padding: 2px 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: ${(p) => p.color ?? "#E2E8F0"};
`;

export default function TagList() {
  return (
    <Wrapper>
      <Item>Resolved</Item>
      <Item color="#000000">10 KSM</Item>
    </Wrapper>
  );
}
