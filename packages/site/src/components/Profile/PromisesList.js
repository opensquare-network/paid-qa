import { useEffect, useState } from "react";

import styled from "styled-components";
import Topic from "components/Topic";
import NoPost from "components/NoPost";
import ListLoader from "components/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";

const Wrapper = styled.div``;

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
        promises?.items?.map((promise, index) => (
          <Topic key={index} topic={promise.topic} />
        ))
      )}
      <Pagination
        className="pagination"
        {...{ ...promises, setPage, pageSize }}
        large
      />
    </Wrapper>
  );
}
