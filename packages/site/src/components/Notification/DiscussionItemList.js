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

export default function DiscussionItemList({ notifications }) {
  return (
    <Wrapper>
      {notifications?.items?.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </Wrapper>
  );
}
