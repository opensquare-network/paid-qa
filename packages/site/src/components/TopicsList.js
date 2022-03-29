import { useEffect, useState } from "react";

import styled from "styled-components";
import Topic from "components/Topic";
import NoPost from "./NoPost";
import ListLoader from "./Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAssetSelector,
  filterStatusSelector,
  setTopics,
  topicsSelector,
} from "../store/reducers/topicSlice";
import serverApi from "../services/serverApi";
import { addToast, ToastTypes } from "../store/reducers/toastSlice";
import { EmptyList } from "../utils/constants";

const Wrapper = styled.div``;

export default function TopicsList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const topics = useSelector(topicsSelector);
  const filterAsset = useSelector(filterAssetSelector);
  const filterStatus = useSelector(filterStatusSelector);

  useEffect(() => {
    serverApi
      .fetch("/topics", {
        status: filterStatus || "all",
        symbol: filterAsset?.symbol || "all",
        page,
      })
      .then(({ result, error }) => {
        dispatch(setTopics(result ?? EmptyList));
        if (error) {
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load topics",
            })
          );
        }
      });
  }, [dispatch, filterStatus, filterAsset, page]);

  return (
    <Wrapper>
      {topics === null ? (
        <ListLoader />
      ) : topics.items.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        topics.items.map((topic, index) => <Topic key={index} topic={topic} />)
      )}
      <Pagination className="pagination" {...{ ...topics, setPage }} large />
    </Wrapper>
  );
}
