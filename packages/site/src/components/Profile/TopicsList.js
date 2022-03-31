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

export default function TopicsList({ network, address }) {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState({ items: null, total: 0 });

  useEffect(() => {
    setTopics({ items: null, total: topics.total });
    serverApi
      .fetch(`/network/${network}/address/${address}/topics`, { page })
      .then(({ result, error }) => {
        setTopics(result ?? EmptyList);
        if (error) {
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load topics",
            })
          );
        }
      });
  }, [dispatch, network, address, page, topics.total]);

  return (
    <Wrapper>
      {topics.items === null ? (
        <ListLoader />
      ) : topics.items.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        topics.items.map((topic, index) => <Topic key={index} topic={topic} />)
      )}
      <Pagination
        className="pagination"
        {...{ ...topics, setPage, pageSize }}
        large
      />
    </Wrapper>
  );
}
