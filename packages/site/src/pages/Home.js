import styled from "styled-components";

import Container from "components/Container";
// import Explorer from "components/Explorer";
import AskQuestion from "components/AskQuestion";
import PostList from "components/PostList";
import Background from "components/Background";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
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
          {/*<Explorer />*/}
          <PostListTitle>
            Topics
            <AskQuestion />
          </PostListTitle>
          <PostList />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
