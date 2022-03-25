import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { Link } from "react-router-dom";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

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
