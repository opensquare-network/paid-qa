import { useEffect, useState } from "react";
import styled from "styled-components";

import { NoData, Pagination, Container } from "@osn/common-ui";
import Header from "../components/Notification/Header";
import NotificationList from "../components/Notification/NotificationList";
import DiscussionItemList from "components/Notification/DiscussionItemList";
import RewardItemList from "components/Notification/RewardItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearUnread } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import { useNotifications } from "../utils/hooks";

const Wrapper = styled.div`
  position: relative;
  padding: 0 0 64px;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  .markdown-content {
    max-width: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default function Notifications() {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const account = useSelector(accountSelector);
  const [tab, setTab] = useState("notifications");
  const [isLoading, notifications] = useNotifications(
    page,
    account,
    tab,
    setPage
  );

  useEffect(() => {
    if (account?.address && account?.network) {
      dispatch(clearUnread(account.network, account.address));
    }
  }, [dispatch, account?.network, account?.address]);

  return (
    <Wrapper>
      <Header tab={tab} setTab={setTab} />
      <Container>
        <ContentWrapper>
          {isLoading && <ListLoader style={{ marginTop: 20 }} />}
          {tab === "notifications" && (
            <NotificationList {...{ notifications }} />
          )}
          {tab === "discussions" && (
            <DiscussionItemList {...{ notifications }} />
          )}
          {tab === "rewards" && <RewardItemList {...{ notifications }} />}

          {notifications?.items?.length === 0 && (
            <NoData message={"No current records"} />
          )}
        </ContentWrapper>
        <Pagination
          {...{ page, setPage, pageSize }}
          total={notifications?.total}
        />
      </Container>
    </Wrapper>
  );
}
