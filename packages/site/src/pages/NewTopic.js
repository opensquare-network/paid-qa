import styled from "styled-components";

import Container from "components/Container";
// import Background from "components/Background";
import Breadcrumb from "ui/lib/Navi/Breadcrumb";
import Create from "../components/Create";

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

export default function NewTopic() {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Breadcrumb value="New Post" />
          <Create />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
