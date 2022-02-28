import styled from "styled-components";

import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export default function Name({ address }) {
  return (
    <Link to="/profile">
      <Wrapper>
        <img src="/imgs/icons/polkadot.svg" alt="" />
        <div>
          {address.substring(0, 4)}...
          {address.substring(address.length - 4, address.length)}
        </div>
      </Wrapper>
    </Link>
  );
}
