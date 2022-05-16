import { useEffect, useState } from "react";

import Topic from "components/Topic";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import { List, Pagination } from "@osn/common-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAssetSelector,
  filterTitleSelector,
  setTopics,
  topicsSelector,
} from "../store/reducers/topicSlice";
import serverApi from "../services/serverApi";
import { newErrorToast } from "../store/reducers/toastSlice";
import { EmptyList } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

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
  const filterTitle = useSelector(filterTitleSelector);

  useEffect(() => {
    setSearchParams();
  }, [filterAsset, filterTitle, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch("/topics", {
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
  }, [dispatch, filterAsset?.symbol, filterTitle, page, topics.total]);

  return isLoading ? (
    <ListLoader />
  ) : (
    <>
      <List
        gap={20}
        data={topics?.items}
        noDataMessage="No current topics"
        itemRender={(item) => (
          <List.Item>
            <Topic topic={item} />
          </List.Item>
        )}
      />

      <Pagination {...{ ...topics, setPage }} large />
    </>
  );
}
