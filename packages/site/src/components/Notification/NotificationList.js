import styled from "styled-components";
import ListLoader from "../Skeleton/ListLoader";

const Wrapper = styled.div``;

export default function NotificationList() {
  return (
    <Wrapper>
      <ListLoader />
    </Wrapper>
  );
}
