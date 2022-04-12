import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "./icons/add-appendant.svg";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import RichEdit from "@osn/common-ui/lib/RichEdit";
import Time from "@osn/common-ui/lib/Time";
import IpfsSquare from "@osn/common-ui/lib/IpfsSquare";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { useApi } from "utils/hooks";
import {
  addToast,
  newToastId,
  ToastTypes,
  updateToast,
} from "store/reducers/toastSlice";
import { cidOf } from "services/ipfs";
import { accountSelector } from "store/reducers/accountSlice";
import { fetchTopic } from "store/reducers/topicSlice";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import MicromarkMd from "@osn/common-ui/lib/Preview/MicromarkMd";

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
  > :nth-child(2) {
    margin-top: 4px;
    ${p_14_normal};
    color: #506176;
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
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

export default function Appendants({
  topicCid,
  topicNetwork,
  appendants,
  isOwner,
}) {
  const account = useSelector(accountSelector);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isDifferentNetwork = account?.network !== topicNetwork;

  const api = useApi();
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const showErrorToast = (message) => {
    dispatch(
      addToast({
        type: ToastTypes.Error,
        message,
      })
    );
  };

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
    dispatch(
      addToast({
        type: ToastTypes.Pending,
        message: "Waiting for signing...",
        id: toastId,
        sticky: true,
      })
    );

    try {
      const { blockHash, extrinsicIndex } = await submitRemark(
        api,
        remark,
        account,
        (status) => {
          dispatch(
            updateToast({
              id: toastId,
              message: status,
            })
          );
        }
      );
      const payload = {
        data,
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/appendants`,
        payload
      );
      if (result) {
        setContent("");
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Success,
            message: "Appendant added",
          })
        );
        dispatch(fetchTopic(topicCid));
        setEditing(false);
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

  const appendantsCount = appendants?.length || 0;
  if (!isOwner && !appendantsCount) {
    return null;
  }

  return (
    <Wrapper>
      <FlexBetween>
        <DividerWrapper>
          <span>Appendants</span>
          <Count>{appendantsCount}</Count>
        </DividerWrapper>
        <AddButton onClick={() => setEditing(!editing)}>
          <AddIcon />
        </AddButton>
      </FlexBetween>
      {appendants?.map((item, index) => (
        <ItemWrapper key={index}>
          <div>
            <StyledDividerWrapper>
              <div>{`#${index + 1}`}</div>
              <Time time={item.blockTime} />
            </StyledDividerWrapper>
            <IpfsSquare
              href={
                item.pinned ? `https://ipfs.infura.io/ipfs/${item.cid}` : null
              }
            />
          </div>
          <MicromarkMd md={item.content} />
        </ItemWrapper>
      ))}
      {editing && (
        <EditorWrapper>
          <RichEdit
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
            disabled={isDifferentNetwork}
            submitting={loading}
            errorMsg={
              isOwner && isDifferentNetwork
                ? "Please switch to the same network as topic to post."
                : ""
            }
          />
        </EditorWrapper>
      )}
    </Wrapper>
  );
}
