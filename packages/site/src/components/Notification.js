import styled from "styled-components";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  cursor: pointer;
`;

export default function Notification() {
  return (
    <Wrapper>
      <img src="/imgs/icons/notification.svg" alt="" />
    </Wrapper>
  );
}
