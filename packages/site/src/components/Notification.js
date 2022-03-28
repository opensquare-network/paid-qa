import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnread, unreadSelector } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";

const Wrapper = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;
`;

export default function Notification() {
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
      clearInterval(timer)
    };
  }, [dispatch, account?.address, account?.network]);

  return (
    <Link to="/notifications">
      <Wrapper>
        <img src={unread? "/imgs/icons/unread-notification.svg" : "/imgs/icons/notification.svg"} alt="" />
      </Wrapper>
    </Link>
  );
}
