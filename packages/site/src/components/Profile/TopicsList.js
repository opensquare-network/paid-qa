import { useEffect, useState } from "react";
import Topic from "components/Topic";
import NoPost from "components/NoPost";
import ListLoader from "components/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { newErrorToast } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Wrapper from "./styled/ListWrapper";

export default function TopicsList({ network, address }) {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch(`/network/${network}/address/${address}/topics`, { page })
      .then(({ result, error }) => {
        setTopics(result ?? EmptyList);
        if (error) {
          dispatch(newErrorToast(error?.message || "Failed to load topics"));
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
      ) : topics?.items?.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        topics?.items?.map((topic, index) => (
          <Topic key={index} topic={topic} />
        ))
      )}
      <Pagination
        className="pagination"
        {...{ ...topics, setPage, pageSize }}
        large
      />
    </Wrapper>
  );
}
