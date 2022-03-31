import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
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

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  ${p_14_normal};
  color: #506176;
  > :nth-child(2) {
    font-weight: 500;
    color: #1e2134;
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

export default function AnswerList({ network, address }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState({ items: null, total: 0 });

  useEffect(() => {
    setAnswers({ items: null, total: answers.total });
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
      });
  }, [dispatch, network, address, page, answers.total]);

  return (
    <Wrapper>
      {answers.items === null ? (
        <ListLoader />
      ) : answers.items.length === 0 ? (
        <NoPost message={"No current replies"} />
      ) : (
        answers.items.map((answer, index) => {
          return (
            <Card key={index}>
              <StyledDividerWrapper>
                <div>Reply to</div>
                <div>
                  <TitleLink to={`/topic/${answer.topic.cid}`}>
                    {answer.topic.title}
                  </TitleLink>
                </div>
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
