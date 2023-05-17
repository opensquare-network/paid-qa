import styled from "styled-components";

import BigNumber from "bignumber.js";
import Input from "@osn/common-ui/es/styled/Input";
import Button from "@osn/common-ui/es/styled/Button";
import { accountSelector } from "../../store/reducers/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cidOf } from "../../services/ipfs";
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
import { useApi } from "../../utils/hooks";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { useIsMounted } from "@osn/common/utils/hooks";
import { p_16_semibold } from "@osn/common-ui/es/styles/textStyles";
import RewardDetail from "./RewardDetail";
import RichEditor from "@osn/common-ui/es/RichEditor";
import {
  DEFAULT_MINIMUM_FUND_AMOUNT,
  MINIMUM_FUND_AMOUNTS,
} from "utils/constants";
import ConnectWallet from "components/ConnectWallet";

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
  }
`;

const Title = styled.div`
  ${p_16_semibold};
  color: #1e2134;
`;

export default function Create() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const navigate = useNavigate();
  const isMounted = useIsMounted();

  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState();
  const [connectWalletModalVisible, setConnectWalletModalVisible] =
    useState(false);

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

    const minimum = MINIMUM_FUND_AMOUNTS[symbol] || DEFAULT_MINIMUM_FUND_AMOUNT;
    if (new BigNumber(rewardAmount).lt(minimum)) {
      return showErrorToast(
        `Reward amount cannot be less than minimum: ${minimum}`,
      );
    }

    const data = { title, content };
    const cid = await cidOf(data);

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
      dispatch(newErrorToast(`Failed to create topic. ${e.message}`));
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
        <RichEditor
          content={content}
          setContent={setContent}
          disabled={loading}
          showSubmitButton={false}
        />
      </Main>
      <Side>
        {account ? (
          <Box>
            <RewardDetail
              tokenIdentifier={tokenIdentifier}
              setTokenIdentifier={setTokenIdentifier}
              inputAmount={rewardAmount}
              setInputAmount={setRewardAmount}
              symbol={symbol}
              setSymbol={setSymbol}
              setDecimals={setDecimals}
            />
            <Button
              onClick={onPublish}
              primary
              block
              disabled={!account || !(+rewardAmount > 0)}
              isLoading={loading}
            >
              Post
            </Button>
          </Box>
        ) : (
          <Box>
            <ConnectWallet
              visible={connectWalletModalVisible}
              setVisible={setConnectWalletModalVisible}
            />
          </Box>
        )}
      </Side>
    </Wrapper>
  );
}
