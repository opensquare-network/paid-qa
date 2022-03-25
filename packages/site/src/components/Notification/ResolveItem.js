import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";

const Wrapper = styled(Card)`
  ${p_14_normal};
  color: #506176;

  a {
    &:hover {
      text-decoration: underline;
    }
    cursor: pointer;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function ResolveItem({ notification }) {
  const topic = notification.data.topic;
  return (
    <Wrapper>
      <DividerWrapper>
        <Flex>
          Topic
          <MarginX8>
            <Link to={`/topic/${topic.cid}`}>
              <TextMajor>{topic.title}</TextMajor>
            </Link>
          </MarginX8>
          has been resolved
        </Flex>
        <Time time={notification.createdAt} />
      </DividerWrapper>
    </Wrapper>
  );
}
