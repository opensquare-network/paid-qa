import styled from "styled-components";
import { Time, MarkdownPreview, Flex, Card } from "@osn/common-ui";
import { Link } from "react-router-dom";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";

const StyledDividerWrapper = styled(Flex)`
  ${p_14_normal};
  color: #506176;
  > :nth-child(2) {
    font-weight: 500;
    color: #1e2134;
  }
  > :nth-child(2)::after {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
  }
`;

const TitleLink = styled(Link)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const MarkdownPreviewWrapper = styled.div`
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function AnswerItem({ data }) {
  return (
    <Card
      size="small"
      head={
        <StyledDividerWrapper>
          <span>Reply to&nbsp;</span>
          <TitleLink to={`/topic/${data?.topic?.cid}`}>
            {data?.topic?.title}
          </TitleLink>
          &nbsp;
          <Time time={data?.createdAt} />
        </StyledDividerWrapper>
      }
    >
      <MarkdownPreviewWrapper>
        <MarkdownPreview
          content={data?.content}
          bordered={false}
          allowTags={["a"]}
        />
      </MarkdownPreviewWrapper>
    </Card>
  );
}
