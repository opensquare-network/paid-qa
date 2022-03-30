import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Explorer from "components/Explorer";
import NewTopicAnchor from "components/NewTopicButton";
import TopicsList from "components/TopicsList";
import Background from "components/Background";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const PostListTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin: 0;
`;

export default function Home() {
  return (
    <Wrapper>
      <Background />
      <Container>
        <ContentWrapper>
          <Explorer />
          <PostListTitle>
            Topics
            <NewTopicAnchor />
          </PostListTitle>
          <TopicsList />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
