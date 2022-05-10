import styled, { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import NetworkUser from "../User/NetworkUser";
import { Time, Card, Flex, FlexBetween } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
} from "@osn/common-ui/lib/styles/colors";
import Check from "@osn/common-ui/lib/imgs/icons/check.svg";
import { Link } from "react-router-dom";
import { MOBILE_SIZE } from "@osn/consts";
import { micromark } from "micromark";
import { useState } from "react";

const dot = css`
  &::after {
    content: "·";
    margin: 0 8px;
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
const ReplyContent = styled.div`
  color: ${text_dark_minor};

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    -webkit-line-clamp: 3;
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

  a {
    &:hover {
      text-decoration: underline;
    }

    cursor: pointer;
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

  ${(p) =>
    !p.read &&
    css`
      &::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        background-color: ${primary_turquoise_500};
      }

      &::after {
        content: "";
        display: none;
        width: 100%;
        height: 100%;
        background: url(${Check}) no-repeat center;
      }

      &:hover {
        &::before {
          display: none;
        }
        &::after {
          display: block;
        }
      }
    `}

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
  }
`;

const TypeMap = {
  topicResolved: "resolved",
  support: "promised",
  fund: "funded",
};

const assertType = (t = [], expect) => t.includes(expect);

function stripHtml(html = "") {
  return html.replace(/<\/?[^>]+(>|$)/gi, "");
}

function extractReplyContent(content) {
  const html = micromark(content);
  const text = stripHtml(html);

  return text;
}

export default function NotificationItem({ data }) {
  const {
    type,
    read: origRead,
    data: { topic, answer, support, fund },
  } = data;

  const [read, setRead] = useState(origRead);

  const isReply = assertType(type, "reply");
  const isSupport = assertType(type, "support");
  const isFund = assertType(type, "fund");

  // TODO: call API
  function markAsRead() {
    setRead(true);
  }

  let titlePrefix;
  if (isSupport || isFund) {
    const { bounty } = { ...support, ...fund };

    titlePrefix = (
      <Amount>
        {bounty?.value} {bounty?.symbol}
      </Amount>
    );
  }

  return (
    <Card
      size="small"
      head={
        <Head>
          <TitleWrapper>
            <Type>{TypeMap[type] || type}</Type>
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

            {
              <StatusWrapper>
                {!read ? <MarkAsReadButton onClick={markAsRead} /> : <div />}
              </StatusWrapper>
            }
          </InfoWrapper>
        </Head>
      }
    >
      {isReply && (
        <ReplyContent>{extractReplyContent(answer.content)}</ReplyContent>
      )}
    </Card>
  );
}
