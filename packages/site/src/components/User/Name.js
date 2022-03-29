import styled from "styled-components";

import { Link } from "react-router-dom";
import { ChainIcon } from "@osn/common-ui/lib";
import IdentityOrAddr from "./IdentityOrAddr";

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

export default function Name({ network, address }) {
  return (
    <Link to={`/network/${network}/address/${address}`}>
      <Wrapper>
        <ChainIcon chainName={network} size={12} />
        <IdentityOrAddr network={network} address={address} />
      </Wrapper>
    </Link>
  );
}
