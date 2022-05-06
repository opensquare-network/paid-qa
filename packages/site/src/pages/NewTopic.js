import styled from "styled-components";

import { Container } from "@osn/common-ui";
import Create from "../components/Create";
import Breadcrumb from "../components/Breadcrumb";

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
