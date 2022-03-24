import { useEffect, useState } from "react";

import styled from "styled-components";
import Topic from "components/Topic";
import NoPost from "./NoPost";
import ListLoader from "./Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setTopics, topicsSelector } from "../store/reducers/topicSlice";
import serverApi from "../services/serverApi";
import { addToast, ToastTypes } from "../store/reducers/toastSlice";

const Wrapper = styled.div``;

export default function TopicsList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const topics = useSelector(topicsSelector);

  useEffect(() => {
    serverApi.fetch("/topics", { page }).then(({ result, error }) => {
      dispatch(setTopics(result ?? { items: [] }));
      if (error) {
        dispatch(
          addToast({
            type: ToastTypes.Error,
            message: error?.message || "Failed to load topics",
          })
        );
      }
    });
  }, [dispatch, page]);

  return (
    <Wrapper>
      {topics === null ? (
        <ListLoader />
      ) : topics.items.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        topics.items.map((topic, index) => <Topic key={index} topic={topic} />)
      )}
      <Pagination
        className="pagination"
        page={topics?.page}
        pageSize={topics?.pageSize}
        total={topics?.total}
        setPage={setPage}
      />
    </Wrapper>
  );
}
