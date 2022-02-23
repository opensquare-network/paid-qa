import styled from "styled-components";

import Background from "components/Background";
import Container from "components/Container";
import Breadcrumb from "components/Breadcrumb";
import Post from "components/Post";

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

export default function Question() {
  return (
    <Wrapper>
      <Background />
      <Container>
        <ContentWrapper>
          <Breadcrumb />
          <Post />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
