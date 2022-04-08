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
  gap: 12px;
  > div {
    flex-basis: 100%;
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
          return (
            <Card key={index} style={{ padding: 24 }}>
              <PromiseWrapper>
                <FlexBetween>
                  <Flex>
                    <span>Promised&nbsp;</span>
                    <TextMajor>
                      {promise.promises
                        ?.map((p) => `${p.value} ${p.symbol}`)
                        .join(", ")}
                    </TextMajor>
                    &nbsp;in&nbsp;
                    <Link to={`/topic/${promise.topic.cid}`}>
                      <TextMajor>{promise.topic.title}</TextMajor>
                    </Link>
                  </Flex>
                  <Tag>{promise.topic.status}</Tag>
                </FlexBetween>
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
