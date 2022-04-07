import { useEffect, useState } from "react";

import styled from "styled-components";
import NoPost from "components/NoPost";
import ListLoader from "components/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import Card from "@osn/common-ui/lib/styled/Card";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import Tag from "../Tag";
import ProgressBar from "../ProgressBar";

const Wrapper = styled.div`
  > div {
    margin-bottom: 20px;
  }
`;

const PromiseWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 8px;
  > div {
    flex-basis: 100%;
  }

  > :first-child {
    margin-bottom: 4px;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const TextAccessory = styled.div`
  color: #a1a8b3;
`;

const Process = styled(Flex)`
  flex-wrap: wrap;
  gap: 12px;
  > div {
    flex-basis: 100%;
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
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load promises",
            })
          );
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
          const symbols = Array.from(
            new Set(promise.promises.map((p) => p.symbol))
          );
          return (
            <Card key={index}>
              <PromiseWrapper>
                <FlexBetween>
                  <Flex>
                    <span>Promised</span>
                    &nbsp;
                    <TextMajor>
                      {promise.value} {promise.symbol}
                    </TextMajor>
                    &nbsp;in&nbsp;
                    <Link to={`/topic/${promise.topic.cid}`}>
                      <TextMajor>{promise.topic.title}</TextMajor>
                    </Link>
                  </Flex>
                  <Tag>{promise.topic.status}</Tag>
                </FlexBetween>
                {symbols?.map((symbol, index) => {
                  const filter = (p) => p.symbol === symbol;
                  const sum = (a, b) => parseFloat(a) + parseFloat(b);
                  const promisedAmount = promise.promises
                    .filter(filter)
                    .map((p) => p.value)
                    .reduce(sum, 0);
                  const fundedAmount =
                    promise.funds
                      ?.filter(filter)
                      ?.map((p) => p.value)
                      ?.reduce(sum, 0) ?? 0;
                  return (
                    <Process key={index}>
                      <ProgressBar
                        percent={(fundedAmount / promisedAmount) * 100}
                      />
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
