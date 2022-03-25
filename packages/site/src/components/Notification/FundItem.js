import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { Avatar } from "@osn/common-ui/lib";
import Flex from "@osn/common-ui/lib/styled/Flex";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { Link } from "react-router-dom";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

const Wrapper = styled(Card)`
  ${p_14_normal};
  color: #506176;

  a {
    &:hover {
      text-decoration: underline;
    }

    cursor: pointer;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const HorizonDivider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function FundItem({ notification }) {
  const funder = notification.data.byWho.address;
  const network = notification.data.answer.network;
  const { topic, answer, fund } = notification.data;
  return (
    <Wrapper>
      <DividerWrapper>
        <Flex>
          Funded by
          <MarginX8>
            <Avatar address={funder} />
          </MarginX8>
          <ChainIcon chainName={network} size={16} />
          <TextMajor style={{ marginLeft: 4 }}>
            {addressEllipsis(funder)}
          </TextMajor>
          &nbsp;with&nbsp;
          <TextMajor>
            {fund.value} {fund.symbol}
          </TextMajor>
          &nbsp;in&nbsp;
          <Link to={`/topic/${topic.cid}`}>
            <TextMajor>{topic.title}</TextMajor>
          </Link>
        </Flex>
        <Time time={answer.createdAt} />
      </DividerWrapper>
      <HorizonDivider />
      {/*todo: strip all syntax, keep plain text only, and <a>*/}
      <MicromarkMd md={answer.content} />
    </Wrapper>
  );
}
