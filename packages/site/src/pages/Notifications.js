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
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import serverApi from "../services/serverApi";
import NoPost from "../components/NoPost";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import ListLoader from "../components/Skeleton/ListLoader";
import { EmptyList } from "../utils/constants";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

const tabRouterMap = new Map([
  ["notifications", "notifications"],
  ["discussions", "notifications/discussion"],
  ["rewards", "notifications/reward"],
]);

export default function Notifications() {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState(null);
  const account = useSelector(accountSelector);
  const [tab, setTab] = useState("notifications");

  useEffect(() => {
    if (!account?.address || !account?.network) {
      return;
    }
    dispatch(clearUnread(account.network, account.address));
  }, [dispatch, account?.network, account?.address]);

  useEffect(() => {
    setNotifications(null);
    setPage(1);
  }, [tab]);

  useEffect(() => {
    if (account?.network && account?.address) {
      serverApi
        .fetch(
          `/network/${account.network}/address/${
            account.address
          }/${tabRouterMap.get(tab)}`,
          { page, pageSize }
        )
        .then(({ result }) => {
          if (result) {
            setNotifications(result);
          } else {
            setNotifications(EmptyList);
          }
        });
    }
  }, [account.network, account.address, page, tab]);

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Header tab={tab} setTab={setTab} />
          {notifications === null && <ListLoader style={{ marginTop: 20 }} />}
          {tab === "notifications" && (
            <NotificationList {...{ notifications }} />
          )}
          {tab === "discussions" && (
            <DiscussionItemList {...{ notifications }} />
          )}
          {tab === "rewards" && <RewardItemList {...{ notifications }} />}
        </ContentWrapper>
        {notifications?.items?.length === 0 && (
          <NoPost message={"No current records"} />
        )}
        {notifications && (
          <Pagination
            {...{ page, setPage, pageSize }}
            total={notifications?.total}
          />
        )}
      </Container>
    </Wrapper>
  );
}
