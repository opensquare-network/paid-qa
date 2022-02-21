import styled from "styled-components";

import Container from "components/Container";
import Explorer from "components/Explorer";

const Wrapper = styled.section`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Explorer />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
