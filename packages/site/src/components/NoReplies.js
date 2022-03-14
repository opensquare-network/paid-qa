import styled from "styled-components";

const Wrapper = styled.div`
  background: #ffffff;
  border-top: 1px solid #f0f3f8;
  border-bottom: 1px solid #f0f3f8;
  height: 131px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #9da9bb;
`;

export default function NoReplies({ message = "No current replies" }) {
  return <Wrapper>{message}</Wrapper>;
}
