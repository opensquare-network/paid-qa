import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import styled from "styled-components";
import IdentityOrAddr from "./User/IdentityOrAddr";
import { p_12_normal } from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { encodeNetworkAddress } from "@osn/common/src/utils/address";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 8px 16px;
  margin: 16px 0;

  background: #fbfcfe;

  ${p_12_normal};

  span {
    line-height: 18px !important;
  }
  > :last-child {
    margin-right: 0;
  }
  a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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
      {funds?.map((fund, index) => {
        const ss58Address = encodeNetworkAddress(fund.sponsor, fund.network);
        return (
          <Item key={index}>
            <Flex>
              <IdentityOrAddr
                address={ss58Address}
                network={fund.network}
                noIcon
              />
            </Flex>
            <a
              href={`https://${fund.network}.subscan.io/extrinsic/${fund.blockHeight}-${fund.extrinsicIndex}`}
              target="_blank"
              rel="noreferrer"
            >
              {fund.value} {fund.symbol}
            </a>
          </Item>
        );
      })}
    </Wrapper>
  );
}
