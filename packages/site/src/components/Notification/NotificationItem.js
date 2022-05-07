import styled, { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import NetworkUser from "../User/NetworkUser";
import { Time, Card } from "@osn/common-ui";
import { text_dark_minor } from "@osn/common-ui/lib/styles/colors";
import { Link } from "react-router-dom";

const dot = css`
  &::after {
    content: "·";
    margin: 0 8px;
  }
`;
const ItemHeader = styled.div`
  display: flex;
`;
const ItemHeaderLeft = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  align-items: center;
`;
const ItemHeaderRight = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: space-between;
`;
const ItemContent = styled.div`
  color: ${text_dark_minor};
`;
const Type = styled.span`
  text-transform: capitalize;
  color: ${text_dark_minor};
  ${dot}
`;
const Amount = styled.p`
  ${p_14_medium};
  white-space: nowrap;
  margin: 0;
  ${dot}
`;
const Title = styled.p`
  ${p_14_medium};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;

  a {
    &:hover {
      text-decoration: underline;
    }

    cursor: pointer;
  }
`;

const TypeMap = {
  topicResolved: "resolved",
  support: "supported",
};

const assertType = (t, expect) => t.includes(expect);

function defaultHeadRender(type, title) {
  return (
    <>
      {type}
      {title}
    </>
  );
}

export default function NotificationItem({ data }) {
  const {
    type,
    data: { topic, answer, support },
  } = data;

  const content = assertType(type, "reply") && answer.content;

  let headRender = defaultHeadRender;
  if (assertType(type, "support")) {
    headRender = (type, title) => (
      <>
        {type}
        <Amount>
          {support?.bounty?.value} {support?.bounty?.symbol}
        </Amount>
        {title}
      </>
    );
  }

  return (
    <Card
      size="small"
      head={
        <ItemHeader>
          <ItemHeaderLeft>
            {headRender(
              <Type>{TypeMap[type] || type}</Type>,
              <Title>
                <Link to={`/topic/${topic.cid}`}>{topic.title}</Link>
              </Title>
            )}
          </ItemHeaderLeft>
          <ItemHeaderRight>
            <NetworkUser
              address={topic.signer}
              network={topic.network}
              iconSize={16}
              tooltipPosition="down"
            ></NetworkUser>
            <Time time={topic.createdAt} />
            {/* TODO: read or not? */}
            <div></div>
          </ItemHeaderRight>
        </ItemHeader>
      }
    >
      {content && <ItemContent>{content}</ItemContent>}
    </Card>
  );
}
