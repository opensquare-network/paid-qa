import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import styled from "styled-components";
import IdentityOrAddr from "./User/IdentityOrAddr";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 8px 16px;
  margin: 16px 0;

  background: #fbfcfe;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  span {
    line-height: 18px !important;
  }
  > :last-child {
    margin-right: 0;
  }
`;

const Header = styled.span`
  margin-right: 16px;
  color: #a1a8b3;
  white-space: nowrap;
`;

const Item = styled(DividerWrapper)`
  font-weight: 500;
  margin-right: 16px;

  span {
    color: #506176 !important;
  }
`;

export default function Funders({ funds }) {
  return (
    <Wrapper>
      <Header>Funded by</Header>
      {funds?.map((fund, index) => (
        <Item key={index}>
          <IdentityOrAddr
            address={fund.sponsor}
            network={fund.network}
            noIcon
          />
          <span>
            {fund.value} {fund.symbol}
          </span>
        </Item>
      ))}
    </Wrapper>
  );
}
