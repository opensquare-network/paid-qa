import styled from "styled-components";
import NoData from "@osn/common-ui/lib/NoData";

const Wrapper = styled.div`
  // override ListWrapper
  padding: 0 !important;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
`;

export default function NoPost({ message = "No current posts" }) {
  return (
    <Wrapper>
      <NoData message={message} />
    </Wrapper>
  );
}
