import { useState } from "react";
import styled from "styled-components";

import { NoData, Pagination, Container, List, Flex } from "@osn/common-ui";
import { useDispatch, useSelector } from "react-redux";
import { clearUnread } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import { useNotifications } from "../utils/hooks";
import NotificationItem from "../components/Notification/NotificationItem";
import NotificationTabs from "../components/Notification/NotificationTabs";
import { ReactComponent as CheckUnderline } from "@osn/common-ui/lib/imgs/icons/check-underline.svg";
import { text_dark_minor } from "@osn/common-ui/lib/styles/colors";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";

const Wrapper = styled.div`
  position: relative;
  padding: 0 0 64px;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  .markdown-content {
    max-width: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ReadAllButton = styled(Flex)`
  color: ${text_dark_minor};
  ${p_14_medium};
  cursor: pointer;
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

  return (
    <Wrapper>
      <NotificationTabs
        items={[{ value: "notifications", suffix: notifications?.total }]}
        value={tab}
        setValue={setTab}
        extra={
          notifications?.items?.length > 0 && (
            <ReadAllButton
              role="button"
              onClick={() =>
                dispatch(clearUnread(account.network, account.address))
              }
            >
              <CheckUnderline style={{ marginRight: 11 }} />
              Mark all as read
            </ReadAllButton>
          )
        }
      />

      <Container>
        <ContentWrapper>
          {isLoading && <ListLoader />}

          <List
            gap={20}
            data={notifications?.items}
            itemRender={(item) => (
              <List.Item>
                <NotificationItem
                  data={item}
                  onMarkAsRead={() =>
                    dispatch(
                      clearUnread(account.network, account.address, {
                        items: [item._id],
                      })
                    )
                  }
                />
              </List.Item>
            )}
          />

          {notifications?.items?.length === 0 && (
            <NoData message={"No notifications"} />
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
