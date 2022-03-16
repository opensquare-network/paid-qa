import styled from "styled-components";

import Avatar from "@osn/common-ui/lib/Account/Avatar";
import Name from "./Name";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :nth-child(2) {
    margin-left: 24px;
    > :first-child {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
    }
    > :nth-child(2) {
      font-size: 14px;
      line-height: 24px;
      color: #506176;
    }
  }
`;

export default function Profile({
  address = "12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh",
}) {
  return (
    <Wrapper>
      <Avatar address={address} size={64} />
      <div>
        <Name address={address} />
        <div>{address}</div>
      </div>
    </Wrapper>
  );
}
