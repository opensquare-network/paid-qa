import DividerWrapper from '@osn/common-ui/lib/styled/DividerWrapper';
import styled from 'styled-components';
import { addressEllipsis } from '@osn/common-ui/lib/utils/address';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px 0;

  background: #FBFCFE;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const Header = styled.span`
  color: #A1A8B3;
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

const Item = styled(DividerWrapper)`
`;

export default function Funders({ funds }) {
  return (
    <Wrapper>
      <Header>Funded by</Header>
      <Items>
        {funds?.map((fund, index) => (
          <Item key={index}>
            <span>{addressEllipsis(fund.sponsor)}</span>
            <span>{fund.value} {fund.symbol}</span>
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
}
