import styled from "styled-components";

import Avatar from "./Avatar";
import Name from "./Name";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

export default function User({
  address = "12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh",
}) {
  return (
    <Wrapper>
      <Avatar address={address} />
      <Name address={address} />
    </Wrapper>
  );
}
