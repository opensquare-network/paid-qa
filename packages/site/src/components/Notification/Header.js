import styled from "styled-components";
import Tabs from "./Tabs";
import Container from "@osn/common-ui/lib/styled/Container";

const Wrapper = styled.div`
  background: #ffffff;
  padding-top: 40px;
  border-bottom: solid 1px #f0f3f8;
`;

export default function Header({ tab, setTab }) {
  return (
    <Wrapper>
      <Container>
        <Tabs value={tab} setValue={setTab} />
      </Container>
    </Wrapper>
  );
}
