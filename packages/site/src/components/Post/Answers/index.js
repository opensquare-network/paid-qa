import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
  updatePendingToast,
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
} from "@osn/common/src/utils/address";
import { fetchIdentity } from "@osn/common/src/services/identity";
import uniqWith from "lodash.uniqwith";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { p_16_semibold } from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import { useSearchParams } from "react-router-dom";
import { identityChainMap } from "@osn/constants";
import NetworkUser from "components/User/NetworkUser";
import { MentionIdentityUser } from "@osn/common-ui";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const setPage = (page) => {
    setSearchParams({ page });
  };
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  const [suggestions, setSuggestions] = useState([]);

  const showErrorToast = (message) => dispatch(newErrorToast(message));

  const resolveMentionFormat = (identity, user) =>
    `[@${identity?.info?.display || addressEllipsis(user.address)}](${
      user.address
    }-${user.network}) `;

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
    dispatch(newPendingToast(toastId, "Waiting for signing..."));

    try {
      setLoading(true);

      const signature = await signMessage(msg, account.address);
      const payload = {
        answer,
        address: encodeNetworkAddress(account.address, account.network),
        network: account.network,
        signature,
      };

      dispatch(updatePendingToast(toastId, "Posting..."));

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/answers`,
        payload
      );
      if (result) {
        setContent("");
        dispatch(newSuccessToast("Answer posted"));
        dispatch(fetchAnswers(topicCid, page));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(`Failed to add answer. ${e.message}`));
    } finally {
      dispatch(removeToast(toastId));
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const fetchIdentitySuggestions = useCallback(async () => {
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
          const identityChain = identityChainMap[item.network] || item.network;
          const identity = await fetchIdentity(identityChain, item.address);
          return {
            ...item,
            identity,
          };
        })
    );

    return userIdentities.map((user) => {
      return {
        address: user.address,
        value: resolveMentionFormat(user.identity, user),
        preview: (
          <NetworkUser noLink address={user.address} network={user.network} />
        ),
      };
    });
  }, [answers]);

  useEffect(() => {
    fetchIdentitySuggestions().then((v) => {
      setSuggestions(v);
    });
  }, [answers, fetchIdentitySuggestions]);

  const loadSuggestions = (text) => {
    return suggestions.filter((i) =>
      i.address.toLowerCase().includes(text.toLowerCase())
    );
  };

  const forceEditor = () => {
    editorRef.current?.querySelector("textarea")?.focus();
    editorRef.current?.scrollIntoView();
  };

  const onReply = async (user) => {
    const identityChain = identityChainMap[user.network] || user.network;
    const identity = fetchIdentity(identityChain, user.address);
    const mention = resolveMentionFormat(identity, user);

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
            identifier={<MentionIdentityUser hashRoute target="_blank" />}
          />
        </EditorWrapper>
      )}
    </Card>
  );
}
