import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnread, unreadSelector } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled(FlexCenter)`
  width: 38px;
  height: 38px;
  border: 1px solid #e2e8f0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;
`;

export default function NotificationBell() {
  const dispatch = useDispatch();
  const unread = useSelector(unreadSelector);
  const account = useSelector(accountSelector);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!account?.address || !account?.network) {
        return;
      }
      dispatch(fetchUnread(account.network, account.address));
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, account?.address, account?.network]);

  return (
    <Link to="/notifications">
      <Wrapper>
        <img
          src={
            unread
              ? "/imgs/icons/unread-notification.svg"
              : "/imgs/icons/notification.svg"
          }
          alt=""
        />
      </Wrapper>
    </Link>
  );
}
