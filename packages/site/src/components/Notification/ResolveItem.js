import styled from "styled-components";
import Time from "@osn/common-ui/lib/Time";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

export default function ResolveItem({ notification }) {
  const { topic } = notification.data;
  return (
    <>
      <DividerWrapper>
        <Flex>
          Topic&nbsp;
          <Link to={`/topic/${topic.cid}`}>
            <TextMajor>{topic.title}</TextMajor>
          </Link>
          &nbsp;has been resolved
        </Flex>
        <Time time={notification.updatedAt} />
      </DividerWrapper>
    </>
  );
}
