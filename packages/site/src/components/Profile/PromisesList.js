import { useEffect, useState } from "react";
import styled from "styled-components";
import NoPost from "components/NoPost";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { newErrorToast } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import Card from "@osn/common-ui/lib/styled/Card";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import Tag from "@osn/common-ui/lib/Tag";
import ProgressBar from "../ProgressBar";
import Wrapper from "./styled/ListWrapper";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";

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

export default function PromisesList({ network, address }) {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [promises, setPromises] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch(`/network/${network}/address/${address}/promisedtopics`, { page })
      .then(({ result, error }) => {
        setPromises(result ?? EmptyList);
        if (error) {
          dispatch(newErrorToast(error?.message || "Failed to load promises"));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, network, address, page]);
  return (
    <Wrapper>
      {isLoading ? (
        <ListLoader />
      ) : promises?.items?.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        promises?.items?.map((promise, index) => {
          return (
            <Card key={index}>
              <PromiseWrapper>
                <HeadLine>
                  <TextWrap>
                    <NoWrap>Promised&nbsp;</NoWrap>
                    <TextMajor>
                      {promise.promises
                        ?.map((p) => `${p.value} ${p.symbol}`)
                        .join(", ")}
                    </TextMajor>
                    <NoWrap>&nbsp;in&nbsp;</NoWrap>
                    <Link to={`/topic/${promise.topic.cid}`}>
                      <TextMajor style={{ whiteSpace: "pre-wrap" }}>
                        {promise.topic.title}
                      </TextMajor>
                    </Link>
                  </TextWrap>
                  <Tag>{promise.topic.status}</Tag>
                </HeadLine>
                {promise.promises?.map(({ symbol, value }, index) => {
                  const promisedAmount = value;
                  const fundedAmount =
                    promise.funds.find((item) => item.symbol === symbol)
                      ?.value || 0;
                  const percentage = Math.max(
                    0,
                    Math.min(
                      100,
                      parseInt((fundedAmount / promisedAmount) * 100)
                    )
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
        })
      )}
      <Pagination
        className="pagination"
        {...{ ...promises, setPage, pageSize }}
        large
      />
    </Wrapper>
  );
}
