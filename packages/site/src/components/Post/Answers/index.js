import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import {
  addToast,
  newToastId,
  ToastTypes,
  updateToast,
} from "store/reducers/toastSlice";
import { accountSelector } from "store/reducers/accountSlice";
import serverApi from "services/serverApi";
import RichEdit from "@osn/common-ui/lib/RichEdit";
import { signMessage } from "services/chainApi";
import NoReplies from "components/NoReplies";
import {
  answersSelector,
  fetchAnswers,
  setAnswers,
} from "store/reducers/answerSlice";
import {
  addressEllipsis,
  encodeNetworkAddress,
} from "@osn/common-ui/lib/utils/address";
import { fetchIdentity } from "@osn/common-ui/lib/services/identity";
import uniqWith from "lodash.uniqwith";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { p_16_semibold } from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Title = styled.div`
  border-bottom: solid 1px #f0f3f8;
  > div > div {
    ${p_16_semibold};
    padding-bottom: 17px;
    display: inline-block;
  }
`;

const PaginationWrapper = styled.div`
  margin: 20px 0;
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

const LoadingWrapper = styled(FlexCenter)`
  height: 104px;
  border-bottom: 1px solid #f0f3f8;
`;

export default function Answers({ topicCid }) {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const answers = useSelector(answersSelector);

  const account = useSelector(accountSelector);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  const showErrorToast = (message) => {
    dispatch(
      addToast({
        type: ToastTypes.Error,
        message,
      })
    );
  };

  useEffect(() => {
    if (topicCid) {
      dispatch(fetchAnswers(topicCid, page));
    }
    return () => {
      dispatch(setAnswers(null));
    };
  }, [dispatch, topicCid, page]);

  const onSubmit = async () => {
    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!content) {
      return showErrorToast("Content is empty");
    }

    const answer = {
      topic: topicCid,
      content,
    };
    const msg = JSON.stringify(answer);

    const toastId = newToastId();
    dispatch(
      addToast({
        type: ToastTypes.Pending,
        message: "Waiting for signing...",
        id: toastId,
        sticky: true,
      })
    );

    try {
      setLoading(true);

      const signature = await signMessage(msg, account.address);
      const payload = {
        answer,
        address: encodeNetworkAddress(account.address, account.network),
        network: account.network,
        signature,
      };

      dispatch(
        updateToast({
          id: toastId,
          message: "Posting...",
        })
      );

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/answers`,
        payload
      );
      if (result) {
        setContent("");
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Success,
            message: "Answer posted",
          })
        );
        dispatch(fetchAnswers(topicCid, page));
      }
      if (error) {
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Error,
            message: error.message,
          })
        );
      }
    } catch (e) {
      dispatch(
        updateToast({
          id: toastId,
          type: ToastTypes.Error,
          message: e.toString(),
        })
      );
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
      dispatch(
        updateToast({
          id: toastId,
          sticky: false,
        })
      );
    }
  };

  const loadSuggestions = async (text) => {
    const userIdentities = await Promise.all(
      uniqWith(
        answers?.items || [],
        (a, b) => a.signer === b.signer && a.network === b.network
      )
        .map((item) => ({
          address: encodeNetworkAddress(item.signer, item.network),
          network: item.network,
        }))
        .map(async (item) => {
          const identity = await fetchIdentity(item.network, item.address);
          return {
            ...item,
            identity,
          };
        })
    );
    return userIdentities
      .map((user) => {
        const display =
          user.identity?.info?.display || addressEllipsis(user.address);
        return {
          preview: display,
          value: `[@${display}](/network/${user.network}/address/${user.address})`,
        };
      })
      .filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
  };

  const forceEditor = () => {
    editorRef.current?.querySelector("textarea")?.focus();
    editorRef.current?.scrollIntoView();
  };

  const onReply = async (user) => {
    const identity = fetchIdentity(user.network, user.address);
    const mention = `[@${
      identity?.info?.display || addressEllipsis(user.address)
    }](/network/${user.network}/address/${user.address})`;

    setContent(content + mention + " ");

    forceEditor();
  };

  return (
    <Card>
      <Title>
        <DividerWrapper>
          <div>Replies</div>
          {typeof answers?.total === "number" && (
            <Count>{answers?.total}</Count>
          )}
        </DividerWrapper>
      </Title>
      {answers === null && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      {answers?.items.length === 0 ? (
        <NoReplies message={"No current replies"} />
      ) : (
        <div>
          {answers?.items?.map((answer, index) => (
            <Item
              key={index}
              height={(answers?.page - 1) * answers?.pageSize + index + 1}
              answer={answer}
              onReply={onReply}
            />
          ))}
        </div>
      )}
      <PaginationWrapper>
        <Pagination
          className="pagination"
          page={answers?.page}
          pageSize={answers?.pageSize}
          total={answers?.total}
          setPage={setPage}
        />
      </PaginationWrapper>
      {!(answers === null) && (
        <EditorWrapper>
          <RichEdit
            ref={editorRef}
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
            submitButtonName="Reply"
            submitting={loading}
            loadSuggestions={loadSuggestions}
          />
        </EditorWrapper>
      )}
    </Card>
  );
}
