import { useEffect, useState } from "react";

import styled from "styled-components";
import Topic from "components/Topic";
// import NoPost from "./NoPost";
import NoData from "@osn/common-ui/lib/NoData";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAssetSelector,
  filterStatusSelector,
  filterTitleSelector,
  setTopics,
  topicsSelector,
} from "../store/reducers/topicSlice";
import serverApi from "../services/serverApi";
import { newErrorToast } from "../store/reducers/toastSlice";
import { EmptyList } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div``;

export default function TopicsList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const setPage = (page) => {
    setSearchParams({ page });
  };
  const topics = useSelector(topicsSelector);
  const [isLoading, setIsLoading] = useState(true);
  const filterAsset = useSelector(filterAssetSelector);
  const filterStatus = useSelector(filterStatusSelector);
  const filterTitle = useSelector(filterTitleSelector);

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [filterAsset, filterStatus, filterTitle, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch("/topics", {
        status: filterStatus,
        symbol: filterAsset?.symbol || "all",
        title: filterTitle,
        page,
      })
      .then(({ result, error }) => {
        dispatch(setTopics(result ?? EmptyList));
        if (error) {
          dispatch(newErrorToast(error?.message || "Failed to load topics"));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    dispatch,
    filterAsset?.symbol,
    filterStatus,
    filterTitle,
    page,
    topics.total,
  ]);

  return (
    <Wrapper>
      {isLoading ? (
        <ListLoader />
      ) : topics?.items?.length === 0 ? (
        <NoData message="topics" />
      ) : (
        topics?.items?.map((topic, index) => (
          <Topic key={index} topic={topic} />
        ))
      )}
      <Pagination className="pagination" {...{ ...topics, setPage }} large />
    </Wrapper>
  );
}
