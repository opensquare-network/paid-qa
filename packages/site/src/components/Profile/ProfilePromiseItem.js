import styled from "styled-components";
import { Card, FlexBetween, Flex, ProgressBar } from "@osn/common-ui";
import { Link } from "react-router-dom";
import { MOBILE_SIZE } from "@osn/consts";
import StatusTag from "components/StatusTag";

const NoWrap = styled.span`
  white-space: nowrap;
`;
const TextWrap = styled.span`
  white-space: pre-wrap;
  word-break: break-all;
`;

const PromiseWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 12px;
  > div {
    flex-basis: 100%;
  }
`;

const HeadLine = styled(FlexBetween)`
  line-height: 24px;
  gap: 12px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    flex-wrap: wrap;
    justify-content: end;
    > :first-child {
      flex-basis: 100%;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
  white-space: nowrap;
`;

const TextAccessory = styled.div`
  color: #a1a8b3;
`;

const Process = styled(Flex)`
  flex-wrap: wrap;
  gap: 4px;
  > div {
    flex-basis: 100%;
  }
  > :nth-child(2) {
    line-height: 24px;
  }
`;

export default function PromiseItem({ data }) {
  const resolved = data?.resolves?.length > 0;

  return (
    <Card size="small">
      <PromiseWrapper>
        <HeadLine>
          <TextWrap>
            <NoWrap>Promised&nbsp;</NoWrap>
            <TextMajor>
              {data?.promises?.map((p) => `${p.value} ${p.symbol}`).join(", ")}
            </TextMajor>
            <NoWrap>&nbsp;in&nbsp;</NoWrap>
            <Link to={`/topic/${data?.topic?.cid}`}>
              <TextMajor style={{ whiteSpace: "pre-wrap" }}>
                {data?.topic?.title}
              </TextMajor>
            </Link>
          </TextWrap>

          <StatusTag status={resolved ? "resolved" : "active"} />
        </HeadLine>
        {data?.promises?.map(({ symbol, value }, index) => {
          const promisedAmount = value;
          const fundedAmount =
            data?.funds?.find((item) => item.symbol === symbol)?.value || 0;
          const percentage = Math.max(
            0,
            Math.min(100, parseInt((fundedAmount / promisedAmount) * 100))
          );
          return (
            <Process key={index}>
              <ProgressBar percent={percentage} />
              <FlexBetween>
                <TextAccessory>Fund</TextAccessory>
                <span>
                  {" "}
                  {fundedAmount}/{promisedAmount} {symbol}
                </span>
              </FlexBetween>
            </Process>
          );
        })}
      </PromiseWrapper>
    </Card>
  );
}
