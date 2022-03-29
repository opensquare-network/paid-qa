import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const FlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  > :nth-child(2)::after {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
  }
`;

export default function ResolveItem({ notification }) {
  const { topic } = notification.data;
  return (
    <>
      <FlexWrapper>
        Topic&nbsp;
        <Link to={`/topic/${topic.cid}`}>
          <TextMajor>{topic.title}</TextMajor>
        </Link>
        <span>&nbsp;has been resolved</span>
        <Time time={notification.updatedAt} />
      </FlexWrapper>
    </>
  );
}
