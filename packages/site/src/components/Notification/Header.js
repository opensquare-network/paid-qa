import styled from "styled-components";
import Tabs from "./Tabs";

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
`;

export default function Header({ tab, setTab }) {
  return (
    <Wrapper>
      <Tabs value={tab} setValue={setTab} />
    </Wrapper>
  );
}
