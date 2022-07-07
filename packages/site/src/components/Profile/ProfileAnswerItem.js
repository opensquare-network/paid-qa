import styled from "styled-components";
import { Time, Flex, Card, MentionIdentityUser } from "@osn/common-ui";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";
import TitleLink from "./styled/TitleLink";

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
        maxLines={3}
        plugins={[
          renderMentionIdentityUserPlugin(<MentionIdentityUser hashRoute />),
        ]}
      />
    </Card>
  );
}
