import { useState } from "react";
import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Header from "../components/Notification/Header";
import NotificationList from "../components/Notification/NotificationList";
import DiscussionItemList from "components/Notification/DiscussionItemList";
import RewardItemList from "components/Notification/RewardItemList";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

export default function Notifications() {
  const [tab, setTab] = useState("notifications");

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Header tab={tab} setTab={setTab} />
          {tab === "notifications" && <NotificationList />}
          {tab === "discussions" && <DiscussionItemList />}
          {tab === "rewards" && <RewardItemList />}
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
