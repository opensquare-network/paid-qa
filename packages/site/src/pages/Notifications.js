import { useEffect, useState } from "react";
import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Header from "../components/Notification/Header";
import NotificationList from "../components/Notification/NotificationList";
import DiscussionItemList from "components/Notification/DiscussionItemList";
import RewardItemList from "components/Notification/RewardItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearUnread } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

export default function Notifications() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [tab, setTab] = useState("notifications");

  useEffect(() => {
    if (!account?.address || !account?.network) {
      return;
    }
    dispatch(clearUnread(account.network, account.address))
  }, [dispatch, account?.network, account?.address]);

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
