import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "./icons/add-appendant.svg";

import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import RichEdit from "@osn/common-ui/lib/RichEdit";
import Time from "@osn/common-ui/lib/Time";
import IpfsSquare from "@osn/common-ui/lib/IpfsSquare";
// import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { useApi } from "utils/hooks";
import { addToast } from "store/reducers/toastSlice";
import { cidOf } from "services/ipfs";
import { accountSelector } from "store/reducers/accountSlice";
import { setTopic } from "store/reducers/topicSlice";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";

const { InteractionEncoder } = encoder;
const { AppendInteraction } = interactions;

const Wrapper = styled.div`
  > :first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
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
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  font-size: 14px;
  line-height: 24px;
  > :first-child {
    font-weight: 500;
  }
  > :nth-child(2) {
    color: #a1a8b3;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

export default function Appendants({ topicCid, appendants, isOwner }) {
  const account = useSelector(accountSelector);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const api = useApi();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!api) {
      dispatch(
        addToast({
          type: "error",
          message: "Network not connected yet",
        })
      );
      return;
    }

    if (!content) {
      dispatch(
        addToast({
          type: "error",
          message: "Content is empty",
        })
      );
      return;
    }

    setLoading(true);

    const data = {
      topic: topicCid,
      content,
    };
    const cid = await cidOf(data);
    const interaction = new AppendInteraction(topicCid, cid);
    const remark = new InteractionEncoder(interaction).getRemark();
    const unsub = await api.tx.system
      .remark(remark)
      .signAndSend(account.address, ({ events = [], status }) => {
        if (status.isInBlock) {
          unsub();
          setLoading(false);

          const extrinsicIndex = JSON.parse(
            events[0]?.phase?.toString()
          )?.applyExtrinsic;

          const blockHash = status.asInBlock.toString();
          const payload = {
            data,
            network: account.network,
            blockHash,
            extrinsicIndex,
          };

          serverApi
            .post(`/topics/${topicCid}/appendants`, payload)
            .then(({ result }) => {
              if (result) {
                setContent("");
                // After appendant is added, update the topic
                serverApi.fetch(`/topics/${topicCid}`).then(({ result }) => {
                  if (result) {
                    dispatch(setTopic(result));
                  }
                });
              }
            });
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e.toString() !== "Error: Cancelled") {
          return dispatch(
            addToast({
              type: "error",
              message: e.toString(),
            })
          );
        }
      });
  };

  const appendantsCount = appendants?.length || 0;
  if (!isOwner && !appendantsCount) {
    return null;
  }

  return (
    <Wrapper>
      <Title>
        <DividerWrapper>
          <div>Appendants</div>
          <Count>{appendantsCount}</Count>
        </DividerWrapper>
        <AddButton onClick={() => setEditing(!editing)}>
          <AddIcon />
        </AddButton>
      </Title>
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
          <div>{item.content}</div>
        </ItemWrapper>
      ))}
      {editing && (
        <EditorWrapper>
          <RichEdit
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
            submitting={loading}
          />
        </EditorWrapper>
      )}
    </Wrapper>
  );
}
