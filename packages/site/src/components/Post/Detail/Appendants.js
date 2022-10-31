import styled, { css } from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "./icons/add-appendant.svg";

import {
  DividerWrapper,
  Time,
  FlexBetween,
  FlexCenter,
  IpfsSquare,
} from "@osn/common-ui";
import RichEditor from "@osn/common-ui/es/RichEditor";
import { useApi } from "utils/hooks";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
  updatePendingToast,
} from "store/reducers/toastSlice";
import { cidOf } from "services/ipfs";
import { accountSelector } from "store/reducers/accountSlice";
import { fetchTopic } from "store/reducers/topicSlice";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { useIsMounted } from "@osn/common/utils/hooks";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/es/styles/textStyles";
import { text_dark_accessory } from "@osn/common-ui/es/styles/colors";
import { MarkdownPreviewer } from "@osn/previewer";

const { InteractionEncoder } = encoder;
const { AppendInteraction } = interactions;

const Wrapper = styled.div`
  > :first-child {
    ${p_16_semibold};
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const ItemWrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  ${p_14_normal};
  > :first-child {
    font-weight: 500;
  }
  > :nth-child(2) {
    color: #a1a8b3;
  }
`;

const AddButton = styled(FlexCenter)`
  cursor: pointer;

  ${(p) =>
    p.editing &&
    css`
      svg {
        path {
          fill: ${text_dark_accessory};
        }
      }
    `}
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

const MarkdownPreviewWrapper = styled.div`
  margin-top: 4px;
`;

export default function Appendants({
  topicCid,
  topicNetwork,
  appendants,
  editable,
}) {
  const account = useSelector(accountSelector);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isDifferentNetwork = account?.network !== topicNetwork;

  const api = useApi();
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const showErrorToast = (message) => dispatch(newErrorToast(message));

  const onSubmit = async () => {
    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!api) {
      return showErrorToast("Network not connected yet");
    }

    if (!content) {
      return showErrorToast("Content is empty");
    }

    const data = {
      topic: topicCid,
      content,
    };
    const cid = await cidOf(data);
    const interaction = new AppendInteraction(topicCid, cid);
    const remark = new InteractionEncoder(interaction).getRemark();

    setLoading(true);

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Waiting for signing..."));

    try {
      const { blockHash, extrinsicIndex, blockHeight, blockTime } =
        await submitRemark(api, remark, account, (status) => {
          dispatch(updatePendingToast(toastId, status));
        });
      const payload = {
        data,
        network: account.network,
        blockHash,
        extrinsicIndex,
        blockHeight,
        blockTime,
        signer: account.address,
      };

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/appendants`,
        payload
      );
      if (result) {
        dispatch(newSuccessToast("Appendant added"));
        if (isMounted.current) {
          setContent("");
          dispatch(fetchTopic(topicCid));
          setEditing(false);
        }
      }

      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(`Failed to add appendant. ${e.message}`));
    } finally {
      dispatch(removeToast(toastId));
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const appendantsCount = appendants?.length || 0;
  if (!editable && !appendantsCount) {
    return null;
  }

  return (
    <Wrapper>
      <FlexBetween>
        <DividerWrapper>
          <span>Appendants</span>
          <Count>{appendantsCount}</Count>
        </DividerWrapper>
        {editable && (
          <AddButton editing={editing} onClick={() => setEditing(!editing)}>
            <AddIcon />
          </AddButton>
        )}
      </FlexBetween>
      {appendants?.map((item, index) => (
        <ItemWrapper key={index}>
          <div>
            <StyledDividerWrapper>
              <div>{`#${index + 1}`}</div>
              <Time time={item.indexer.blockTime} />
            </StyledDividerWrapper>
            <IpfsSquare
              href={
                item.pinned ? `https://ipfs.infura.io/ipfs/${item.cid}` : null
              }
            />
          </div>

          <MarkdownPreviewWrapper>
            <MarkdownPreviewer content={item.content} />
          </MarkdownPreviewWrapper>
        </ItemWrapper>
      ))}
      {editing && (
        <EditorWrapper>
          <RichEditor
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
            disabled={isDifferentNetwork}
            submitting={loading}
            errorMsg={
              editable && isDifferentNetwork
                ? "Please switch to the same network as topic to post."
                : ""
            }
          />
        </EditorWrapper>
      )}
    </Wrapper>
  );
}
