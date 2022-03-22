import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { accountSelector } from "store/reducers/accountSlice";
import serverApi from "services/serverApi";
import RichEdit from "@osn/common-ui/lib/RichEdit";
import { signMessage } from "services/chainApi";
import NoReplies from "components/NoReplies";
import { answersSelector, fetchAnswers } from "store/reducers/answerSlice";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";

const Title = styled.div`
  border-bottom: solid 1px #f0f3f8;
  > div > div {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 17px;
    display: inline-block;
  }
`;

const PagnationWrapper = styled.div`
  margin: 20px 0;
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

export default function Answers({ topicCid }) {
  const dispatch = useDispatch();
  const answers = useSelector(answersSelector);
  const account = useSelector(accountSelector);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAnswers(topicCid, page));
  }, [dispatch, topicCid, page]);

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
        address: encodeNetworkAddress(account.address, account.network),
        network: account.network,
        signature,
      };

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/answers`,
        payload
      );
      if (result) {
        dispatch(fetchAnswers(topicCid, page));
      }
      if (error) {
        dispatch(
          addToast({
            type: ToastTypes.Error,
            message: error.message,
          })
        );
      }

      setContent("");
    } catch (e) {
      if (e.toString() === "Error: Cancelled") {
        return;
      }
      dispatch(
        addToast({
          type: ToastTypes.Error,
          message: e.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        <DividerWrapper>
          <div>Replies</div>
          <Count>{answers?.total || 0}</Count>
        </DividerWrapper>
      </Title>
      {answers?.items.length === 0 ? (
        <NoReplies message={"No current replies"} />
      ) : (
        <div>
          {answers?.items?.map((answer, index) => (
            <Item key={index} answer={answer} />
          ))}
        </div>
      )}
      <PagnationWrapper>
        <Pagination
          className="pagination"
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
          submitButtonName="Reply"
          submitting={loading}
        />
      </EditorWrapper>
    </Card>
  );
}
