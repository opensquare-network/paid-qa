import styled from "styled-components";
import Tabs from "./Tabs";
import Container from "@osn/common-ui/lib/styled/Container";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";

const Wrapper = styled.div`
  background: #ffffff;
  padding-top: 40px;
  border-bottom: solid 1px #f0f3f8;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
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
