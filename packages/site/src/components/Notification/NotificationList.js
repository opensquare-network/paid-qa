import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import serverApi from "services/serverApi";
import { accountSelector } from "store/reducers/accountSlice";
import styled from "styled-components";
import ListLoader from "../Skeleton/ListLoader";
import NotificationItem from "./NotificationItem";
import NoPost from "../NoPost";
import Pagination from "@osn/common-ui/lib/styled/Pagination";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    margin-bottom: 20px;
  }
`;

export default function NotificationList() {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState(null);
  const account = useSelector(accountSelector);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (account?.network && account?.address) {
      serverApi
        .fetch(
          `/network/${account.network}/address/${account.address}/notifications`,
          { page, pageSize: 10 }
        )
        .then(({ result }) => {
          if (result) {
            if (isMounted.current) {
              setNotifications(result);
            }
          }
        });
    }
  }, [account?.network, account?.address, isMounted, page]);

  return (
    <Wrapper>
      {notifications ? (
        notifications.items.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <ListLoader />
      )}
      {notifications?.items?.length === 0 && (
        <NoPost message={"No current records"} />
      )}
      {notifications && <Pagination page={page} setPage={setPage} />}
    </Wrapper>
  );
}
