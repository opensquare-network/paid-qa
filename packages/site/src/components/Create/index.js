import styled from "styled-components";

import ConnectWallet from "../ConnectWallet";
import Input from "@osn/common-ui/lib/styled/Input";
import Button from "@osn/common-ui/lib/styled/Button";
import { accountSelector } from "../../store/reducers/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cidOf } from "../../services/ipfs";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import {
  newToastId,
  newErrorToast,
  newPendingToast,
  updatePendingToast,
  newSuccessToast,
  removeToast,
} from "../../store/reducers/toastSlice";
import serverApi from "../../services/serverApi";
import { useNavigate } from "react-router-dom";
import { getSymbolMetaByChain } from "@osn/common/src/utils/tokenValue";
import { useApi } from "../../utils/hooks";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { p_16_semibold } from "@osn/common-ui/lib/styles/textStyles";
import RewardDetail from "./RewardDetail";
import { RichEditor } from "@osn/common-ui";

const { InteractionEncoder } = encoder;
const { NewInteraction } = interactions;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }

  > :first-child {
    flex-grow: 1;

    > :not(:first-child) {
      margin-top: 20px;
    }
  }

  > :nth-child(2) {
    flex: 0 0 300px;
    @media screen and (min-width: 901px) {
      margin-left: 20px;
    }
    @media screen and (max-width: 900px) {
      margin-top: 20px;
    }
  }
`;

const Box = styled.div`
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  border: 1px solid #f0f3f8;
  padding: 32px;
  background-color: white;
  @media screen and (max-width: 900px) {
    padding: 16px;
    margin: 0 -16px;
  }

  > :not(:first-child) {
    margin-top: 20px;
  }

  > :nth-child(5) {
    margin-top: 8px;
  }
`;

const Main = styled(Box)`
  button {
    max-width: 86px;
    float: right;
  }
`;

const Side = styled.div`
  button {
    box-sizing: border-box;
    width: 100%;
  }
`;

const Title = styled.div`
  ${p_16_semibold};
  color: #1e2134;
`;

const RichEditorWrapper = styled.div`
  .rich-editor {
    .button-preview {
      width: 100%;
    }
    .button-submit {
      display: none;
    }
  }
`;

export default function Create() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const navigate = useNavigate();
  const { symbol, decimals } = getSymbolMetaByChain(account?.network);
  const isMounted = useIsMounted();

  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");

  const showErrorToast = (message) => dispatch(newErrorToast(message));

  const onPublish = async () => {
    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!api) {
      return showErrorToast("Network not connected yet");
    }

    if (!title) {
      return showErrorToast("Title must not be empty");
    }

    if (!content) {
      return showErrorToast("Content must not be empty");
    }

    if (isNaN(rewardAmount) || +rewardAmount <= 0) {
      return showErrorToast("Reward must be a valid number");
    }

    const data = { title, content };
    const cid = await cidOf(data);
    const tokenIdentifier = "N";

    const interaction = new NewInteraction(tokenIdentifier, rewardAmount, cid);
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
        blockHeight,
        extrinsicIndex,
        blockTime,
        bounty: {
          tokenIdentifier,
          value: rewardAmount,
          symbol,
          decimals,
        },
        signer: account.address,
      };

      const { result, error } = await serverApi.post(`/topics/`, payload);
      if (result) {
        dispatch(newSuccessToast("Topic created successfully"));
        navigate(`/topic/${result.cid}`);
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(e.message));
    } finally {
      dispatch(removeToast(toastId));
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <Main>
        <Title>Title</Title>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Input title here..."
          disabled={loading}
        />
        <Title>Topic</Title>
        <RichEditorWrapper>
          <RichEditor
            content={content}
            setContent={setContent}
            disabled={loading}
          />
        </RichEditorWrapper>
      </Main>
      <Side>
        {account ? (
          <Box>
            <RewardDetail
              tokenIdentifier={tokenIdentifier}
              setTokenIdentifier={setTokenIdentifier}
              inputAmount={rewardAmount}
              setInputAmount={setRewardAmount}
            />
            <Button
              onClick={onPublish}
              primary
              disabled={!account || !(+rewardAmount > 0)}
              isLoading={loading}
            >
              Post
            </Button>
          </Box>
        ) : (
          <Box>
            <ConnectWallet onClick={() => dispatch(popUpConnect())} />
          </Box>
        )}
      </Side>
    </Wrapper>
  );
}
