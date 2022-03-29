import styled from "styled-components";
import NotificationItem from "./NotificationItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    margin-bottom: 20px;
  }
`;

export default function DiscussionItemList({ notifications }) {
  return (
    <Wrapper>
      {notifications?.items?.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </Wrapper>
  );
}
