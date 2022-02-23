import styled from "styled-components";

import Container from "components/Container";
import Explorer from "components/Explorer";
import AskQuestion from "components/AskQuestion";
import PostList from "components/PostList";

const Wrapper = styled.section`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const PostListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  > :first-child {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Explorer />
          <div>
            <PostListTitle>
              <div>Recently Listed</div>
              <AskQuestion />
            </PostListTitle>
            <PostList />
          </div>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
