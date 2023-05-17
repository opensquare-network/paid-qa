import styled from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import NetworkUser from "../User/NetworkUser";
import {
  Time,
  Card,
  Flex,
  FlexBetween,
  MentionIdentityUser,
  Dot,
  LoadingIcon,
} from "@osn/common-ui";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";
import {
  text_dark_minor,
  primary_turquoise_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";
import { ReactComponent as CheckIcon } from "@osn/common-ui/es/imgs/icons/check.svg";
import { Link } from "react-router-dom";
import { MOBILE_SIZE } from "@osn/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { clearUnread } from "store/reducers/notificationSlice";

const NotificationItemWrapper = styled.div`
  &:hover {
    .unread-dot {
      display: none;
    }
    .check-icon {
      display: block;
      path {
        fill: ${text_dark_accessory};
      }
    }
  }
`;
const Head = styled(Flex)`
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: block;
  }
`;
const TitleWrapper = styled(Flex)`
  flex: 1;
  max-width: 50%;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    display: block;
  }
`;
const InfoWrapper = styled(FlexBetween)`
  flex: 1;
  max-width: 50%;
  display: flex;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    margin-top: 6px;
  }
`;
const Type = styled.div`
  text-transform: capitalize;
  color: ${text_dark_minor};

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    &::after {
      display: none;
    }
  }
`;
const Amount = styled.span`
  ${p_14_medium};
  white-space: nowrap;
  margin: 0;
`;
const Title = styled.p`
  ${p_14_medium};
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  @media screen and (min-width: ${MOBILE_SIZE - 1}px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-top: 4px;
  }
`;

const NetworkUserWrapper = styled(Flex)`
  flex: 1;
`;
const TimeWrapper = styled(Flex)`
  flex: 1;
  justify-content: flex-end;
`;
const StatusWrapper = styled(Flex)`
  flex: 1;
  width: 18px;
  height: 18px;
  justify-content: flex-end;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
  }
`;
const MarkAsReadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background-color: transparent;

  .check-icon {
    display: none;
  }

  &:hover {
    .unread-dot {
      display: none;
    }

    .check-icon {
      display: block;

      path {
        fill: ${text_dark_minor};
      }
    }
  }
`;
const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${primary_turquoise_500};
`;

const assertType = (t = [], expect) => t.includes(expect);
const resolveItemState = (t = []) => {
  const value = {
    type: "",
    shouldShowAmount: false,
    shouldShowAnswer: false,
  };

  if (assertType(t, "topicResolved")) {
    value.type = "resolved";
  } else if (assertType(t, "support")) {
    value.type = "promised";
    value.shouldShowAmount = true;
  } else if (assertType(t, "fund")) {
    value.type = "funded";
    value.shouldShowAmount = true;
  } else if (assertType(t, "mention")) {
    value.type = "mentioned";
    value.shouldShowAnswer = true;
  } else if (assertType(t, "reply")) {
    value.type = "replied";
    value.shouldShowAnswer = true;
  }

  return value;
};

export default function NotificationItem({ data }) {
  const {
    type: origType,
    read: origRead,
    data: { byWho, topic, answer, support, fund },
    _id: id,
  } = data;

  const dispatch = useDispatch();
  const account = useSelector(accountSelector);

  const [read, setRead] = useState(origRead);
  const [clearing, setClearing] = useState(false);

  const { type, shouldShowAmount, shouldShowAnswer } =
    resolveItemState(origType);

  function handleMarkAsRead() {
    setClearing(true);

    dispatch(
      clearUnread(account.network, account.address, {
        items: [id],
      }),
    )
      .then(() => {
        setRead(true);
      })
      .finally(() => {
        setClearing(false);
      });
  }

  let titlePrefix;
  if (shouldShowAmount) {
    const { bounty } = { ...support, ...fund };

    titlePrefix = (
      <>
        <Amount>
          {bounty?.value} {bounty?.symbol}
        </Amount>
        <Dot />
      </>
    );
  }

  return (
    <NotificationItemWrapper>
      <Card
        size="small"
        head={
          <Head>
            <TitleWrapper>
              <Type>{type}</Type>
              <Dot />
              {titlePrefix}
              <Title>
                <Link to={`/topic/${topic.cid}`}>{topic.title}</Link>
              </Title>
            </TitleWrapper>

            <InfoWrapper>
              <NetworkUserWrapper>
                {byWho && (
                  <NetworkUser
                    address={byWho.address}
                    network={byWho.network}
                    iconSize={16}
                    tooltipPosition="down"
                  />
                )}
              </NetworkUserWrapper>

              <TimeWrapper>
                <Time time={topic.createdAt} />
              </TimeWrapper>

              <StatusWrapper>
                {clearing ? (
                  <LoadingIcon />
                ) : !read ? (
                  <MarkAsReadButton onClick={() => handleMarkAsRead(data)}>
                    <UnreadDot className="unread-dot" />
                    <CheckIcon className="check-icon" />
                  </MarkAsReadButton>
                ) : (
                  <div />
                )}
              </StatusWrapper>
            </InfoWrapper>
          </Head>
        }
      >
        {shouldShowAnswer && (
          <MarkdownPreviewer
            content={answer.content}
            allowedTags={["a"]}
            maxLines={3}
            plugins={[
              renderMentionIdentityUserPlugin(
                <MentionIdentityUser hashRoute />,
              ),
            ]}
          />
        )}
      </Card>
    </NotificationItemWrapper>
  );
}
