import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { accountSelector } from "store/reducers/accountSlice";
import serverApi from "services/serverApi";
import RichEdit from "@osn/common-ui/lib/RichEdit";
import { signMessage } from "services/chainApi";

const Title = styled.div`
  border-bottom: solid 1px #f0f3f8;
  > div {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 17px;
    border-bottom: solid 3px #04d2c5;
    display: inline-block;
  }
`;

const PagnationWrapper = styled.div`
  margin: 20px 0;
`;

const EditorWrapper = styled.div``;

export default function Answers({ topicCid }) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState(null);
  const [page, setPage] = useState(1);
  const account = useSelector(accountSelector);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    serverApi.fetch(`/topics/${topicCid}/answers`, { page }).then(({ result, error }) => {
      if (result) {
        setAnswers(result);
      }
      if (error) {
        dispatch(addToast({
          type: ToastTypes.Error,
          message: error.message
        }));
      }
    });
  }, [dispatch, topicCid, page, refresh]);

  const onSubmit = async () => {
    if (!account) {
      return;
    }

    if (!content) {
      dispatch(
        addToast({
          type: ToastTypes.Error,
          message: "Content is empty",
        })
      );
      return;
    }

    setLoading(true);

    const answer = {
      topic: topicCid,
      content,
    };
    const msg = JSON.stringify(answer);
    try {
      const signature = await signMessage(msg, account.address);
      const payload = {
        answer,
        address: account.address,
        signature,
      };

      const { result, error } = await serverApi.post(`/topics/${topicCid}/answers`, payload);
      if (result) {
        setRefresh(Date.now());
      }
      if (error) {
        dispatch(addToast({
          type: ToastTypes.Error,
          message: error.message
        }));
      }

      setContent("");
    } catch (e) {
      if (e.toString() === "Error: Cancelled") {
        return;
      }
      dispatch(addToast({
        type: ToastTypes.Error,
        message: e.message
      }));
    } finally {
      setLoading(false);
    }
  };

  //TODO: empty answers page
  return (
    <Card>
      <Title>
        <div>Answers</div>
      </Title>
      <div>
        {answers?.items?.map((answer, index) => (
          <Item key={index} answer={answer} />
        ))}
      </div>
      <PagnationWrapper>
        <Pagination className="pagination"
          page={answers?.page}
          pageSize={answers?.pageSize}
          total={answers?.total}
          setPage={setPage}
        />
      </PagnationWrapper>
      <EditorWrapper>
        <RichEdit
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
          showButtons={true}
          submitting={loading}
        />
      </EditorWrapper>
    </Card>
  );
}
