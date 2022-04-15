import styled from "styled-components";
import NoData from "@osn/common-ui/lib/NoData";

const Wrapper = styled.div`
  border-top: 1px solid #f0f3f8;
  border-bottom: 1px solid #f0f3f8;
`;

export default function NoReplies({ message = "No current replies" }) {
  return (
    <Wrapper>
      <NoData message={message} />
    </Wrapper>
  );
}
