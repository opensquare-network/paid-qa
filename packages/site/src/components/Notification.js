import styled from "styled-components";
import { Link } from "react-router-dom";
import MobileInvisible from "./MobileInvisible";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;
`;

export default function Notification() {
  return (
    <MobileInvisible>
      <Link to="/notifications">
        <Wrapper>
          <img src="/imgs/icons/notification.svg" alt="" />
        </Wrapper>
      </Link>
    </MobileInvisible>
  );
}
