import styled from "styled-components";
import { Time, Flex, Card } from "@osn/common-ui";
import { Link } from "react-router-dom";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { MarkdownPreviewer } from "@osn/previewer";
import { maxLinePlugin } from "utils/markdownPreviewerPlugins";

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
      <MarkdownPreviewer
        content={data?.content}
        allowedTags={["a"]}
        plugins={[maxLinePlugin(3)]}
      />
    </Card>
  );
}
