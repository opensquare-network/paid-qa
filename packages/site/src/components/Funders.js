import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import styled from "styled-components";
import IdentityOrAddr from "./User/IdentityOrAddr";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0;

  background: #fbfcfe;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const Header = styled.span`
  color: #a1a8b3;
  white-space: nowrap;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #506176;
  margin-left: 16px;
  > :not(:last-child) {
    margin-right: 16px;
  }
`;

const Item = styled(DividerWrapper)``;

export default function Funders({ funds }) {
  return (
    <Wrapper>
      <Header>Funded by</Header>
      <Items>
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
      </Items>
    </Wrapper>
  );
}
