import { useState } from "react";
import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Tabs from "../components/Tabs";
import NotificationList from "../components/Notification/NotificationList";

const Wrapper = styled.div`
  padding-top: 40px;
`;

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

export default function Notifications() {
  const [tab, setTab] = useState("notifications");

  return (
    <Wrapper>
      <Tabs
        items={["notifications", "discussions", "rewards"]}
        value={tab}
        setValue={setTab}
      />
      <Container>
        <ContentWrapper>
          {tab === "notifications" && <NotificationList />}
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
