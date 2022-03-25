import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import serverApi from "services/serverApi";
import { accountSelector } from "store/reducers/accountSlice";
import styled from "styled-components";
import ListLoader from "../Skeleton/ListLoader";
import NotificationItem from "./NotificationItem";
import NoPost from "../NoPost";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export default function NotificationList() {
  const [notifications, setNotifications] = useState(null);
  const account = useSelector(accountSelector);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (account?.network && account?.address) {
      serverApi
        .fetch(
          `/network/${account.network}/address/${account.address}/notifications`,
          { page: 1, pageSize: 10 }
        )
        .then(({ result }) => {
          if (result) {
            if (isMounted.current) {
              setNotifications(result);
            }
          }
        });
    }
  }, [account?.network, account?.address, isMounted]);

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
    </Wrapper>
  );
}
