import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import { useEffect, useState } from "react";

import NoPost from "components/NoPost";
import ListLoader from "components/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Time from "@osn/common-ui/lib/Time";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";
import { Link } from "react-router-dom";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";
import Wrapper from "./styled/ListWrapper";

const StyledDividerWrapper = styled(Flex)`
  ${p_14_normal};
  color: #506176;
  > :nth-child(2) {
    font-weight: 500;
    color: #1e2134;
  }
  > :nth-child(2)::after {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 16px 0;
`;

const TitleLink = styled(Link)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default function AnswersList({ network, address }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch(`/network/${network}/address/${address}/answers`, { page })
      .then(({ result, error }) => {
        setAnswers(result ?? EmptyList);
        if (error) {
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load replies",
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
      ) : answers?.items?.length === 0 ? (
        <NoPost message={"No current replies"} />
      ) : (
        answers?.items?.map((answer, index) => {
          return (
            <Card key={index}>
              <StyledDividerWrapper>
                <span>Reply to&nbsp;</span>
                <TitleLink to={`/topic/${answer.topic.cid}`}>
                  {answer.topic.title}&nbsp;
                </TitleLink>
                <Time time={answer.createdAt} />
              </StyledDividerWrapper>
              <Divider />
              <MicromarkMd md={answer.content} allowTags={["a"]} />
            </Card>
          );
        })
      )}
      <Pagination
        className="pagination"
        {...{ ...answers, page, setPage }}
        large
      />
    </Wrapper>
  );
}
