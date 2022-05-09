import styled, { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import NetworkUser from "../User/NetworkUser";
import { Time, Card, Flex, FlexBetween } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
} from "@osn/common-ui/lib/styles/colors";
import { ReactComponent as ReadStatus } from "@osn/common-ui/lib/imgs/icons/check.svg";
import { Link } from "react-router-dom";
import { MOBILE_SIZE } from "@osn/consts";

const dot = css`
  &::after {
    content: "·";
    margin: 0 8px;
  }
`;
const ItemHeader = styled(Flex)`
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: block;
  }
`;
const ItemHeaderLeft = styled(Flex)`
  flex: 1;
  max-width: 50%;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    display: block;
  }
`;
const ItemHeaderRight = styled(FlexBetween)`
  flex: 1;
  max-width: 50%;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    margin-top: 6px;
  }
`;
const ItemContent = styled.div`
  color: ${text_dark_minor};
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

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
  }
`;
const UnreadStatus = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${primary_turquoise_500};
`;

const TypeMap = {
  topicResolved: "resolved",
  support: "supported",
};

const assertType = (t, expect) => t.includes(expect);

export default function NotificationItem({ data }) {
  const {
    type,
    read,
    data: { topic, answer, support },
  } = data;

  const isReply = assertType(type, "reply");
  const isSupport = assertType(type, "support");

  let titlePrefix;
  if (isSupport) {
    titlePrefix = (
      <Amount>
        {support?.bounty?.value} {support?.bounty?.symbol}
      </Amount>
    );
  }

  return (
    <Card
      size="small"
      head={
        <ItemHeader>
          <ItemHeaderLeft>
            <Type>{TypeMap[type] || type}</Type>
            <Title>
              {titlePrefix}
              <Link to={`/topic/${topic.cid}`}>{topic.title}</Link>
            </Title>
          </ItemHeaderLeft>

          <ItemHeaderRight>
            <NetworkUser
              address={topic.signer}
              network={topic.network}
              iconSize={16}
              tooltipPosition="down"
            ></NetworkUser>
            <Time time={topic.createdAt} />
            <StatusWrapper>
              {isReply && (
                <Flex>{read ? <ReadStatus /> : <UnreadStatus />}</Flex>
              )}
            </StatusWrapper>
          </ItemHeaderRight>
        </ItemHeader>
      }
    >
      {isReply && <ItemContent>{answer.content}</ItemContent>}
    </Card>
  );
}
