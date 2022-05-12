import styled, { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import NetworkUser from "../User/NetworkUser";
import { Time, Card, Flex, FlexBetween, MarkdownPreview } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
  text_dark_accessory,
} from "@osn/common-ui/lib/styles/colors";
import { ReactComponent as CheckIcon } from "@osn/common-ui/lib/imgs/icons/check.svg";
import { Link } from "react-router-dom";
import { MOBILE_SIZE } from "@osn/consts";
import { useState } from "react";

const dot = css`
  &::after {
    content: "·";
    margin: 0 8px;
  }
`;

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

  a {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
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

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    margin-top: 6px;
  }
`;
const Type = styled.div`
  text-transform: capitalize;
  color: ${text_dark_minor};
  ${dot}

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
  ${dot}
`;
const Title = styled.p`
  ${p_14_medium};
  margin: 0;

  @media screen and (min-width: ${MOBILE_SIZE - 1}px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-top: 4px;
  }
`;

const StatusWrapper = styled(Flex)`
  width: 18px;
  height: 18px;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
  }
`;
const MarkAsReadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
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

export default function NotificationItem({ data, onMarkAsRead = () => {} }) {
  const {
    type: origType,
    read: origRead,
    data: { topic, answer, support, fund },
  } = data;

  const [read, setRead] = useState(origRead);

  const { type, shouldShowAmount, shouldShowAnswer } =
    resolveItemState(origType);

  function handleMarkAsRead(data) {
    onMarkAsRead(data);
    setRead(true);
  }

  let titlePrefix;
  if (shouldShowAmount) {
    const { bounty } = { ...support, ...fund };

    titlePrefix = (
      <Amount>
        {bounty?.value} {bounty?.symbol}
      </Amount>
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
              <Title>
                {titlePrefix}
                <Link to={`/topic/${topic.cid}`}>{topic.title}</Link>
              </Title>
            </TitleWrapper>

            <InfoWrapper>
              <NetworkUser
                address={topic.signer}
                network={topic.network}
                iconSize={16}
                tooltipPosition="down"
              />

              <Time time={topic.createdAt} />

              <StatusWrapper>
                {!read ? (
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
          <MarkdownPreview
            content={answer.content}
            bordered={false}
            allowTags={["a"]}
          />
        )}
      </Card>
    </NotificationItemWrapper>
  );
}
