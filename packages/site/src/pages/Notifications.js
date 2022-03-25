import { useState } from "react";
import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Header from "../components/Notification/Header";
import NotificationList from "../components/Notification/NotificationList";

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
          {tab === "discussions" && <NotificationList />}
          {tab === "rewards" && <NotificationList />}
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
