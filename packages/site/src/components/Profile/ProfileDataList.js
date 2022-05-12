import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import { newErrorToast } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import { List, Pagination } from "@osn/common-ui";
import PromiseItem from "./ProfilePromiseItem";
import FundItem from "./ProfileFundItem";
import RewardItem from "./ProfileRewardItem";
import TopicItem from "./ProfileTopicItem";
import AnswerItem from "./ProfileAnswerItem";

const ListWrapper = styled.div`
  margin: 20px 0;

  a {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const meta = {
  promises: { endpoint: "/promisedtopics", component: PromiseItem },
  funds: { endpoint: "/funds", component: FundItem },
  rewards: { endpoint: "/rewards", component: RewardItem },
  topics: { endpoint: "/topics", component: TopicItem },
  replies: { endpoint: "/answers", component: AnswerItem },
};

function ProfileDataList({ tab, network, address }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { apiUrl, Item } = useMemo(() => {
    const { endpoint, component } = meta[tab];

    return {
      apiUrl: `/network/${network}/address/${address}${endpoint}`,
      Item: component,
    };
  }, [tab, network, address]);

  const fetchData = useCallback(
    (page) => {
      setIsLoading(true);
      setData(EmptyList);

      serverApi
        .fetch(apiUrl, { page })
        .then(({ result, error }) => {
          setData(result ?? EmptyList);
          if (error) {
            dispatch(newErrorToast(error?.message || `Failed to load ${tab}`));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, tab, apiUrl]
  );

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [tab, network, address, fetchData]);

  return isLoading ? (
    <ListLoader />
  ) : (
    <>
      <ListWrapper>
        <List
          data={data?.items}
          gap={20}
          noDataMessage={`No current ${tab}`}
          itemRender={(item) => (
            <List.Item>{Item && <Item data={item} />}</List.Item>
          )}
        />
      </ListWrapper>

      <Pagination {...{ ...data, page, setPage }} large onChange={fetchData} />
    </>
  );
}

export default ProfileDataList;
