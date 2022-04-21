import styled from "styled-components";
import NoData from "@osn/common-ui/lib/NoData";

const Wrapper = styled.div`
  > div {
    box-shadow: none;
    border-left: none;
    border-right: none;
  }
`;

export default function NoReplies({ message = "No current replies" }) {
  return (
    <Wrapper>
      <NoData message={message} />
    </Wrapper>
  );
}
