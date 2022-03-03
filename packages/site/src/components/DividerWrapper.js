import styled from "styled-components";

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
  }
`;

export default DividerWrapper;
