import styled from "styled-components";

import ConnectWallet from "../ConnectWallet";
import Input from "@osn/common-ui/lib/styled/Input";
import MarkdownEditor from "@osn/common-ui/lib/Editor/MarkdownEditor";
import Button from "@osn/common-ui/lib/styled/Button";
import { accountSelector } from "../../store/reducers/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "@osn/common-ui/lib/styled/SubTitle";
import ChainItem from "@osn/common-ui/lib/Chain/ChainSelectItem";
import AmountInput from "../AmountInput";
import FlexBetween from "ui/lib/styled/FlexBetween";
import { useEffect, useState } from "react";
import { cidOf } from "../../services/ipfs";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import { addToast, ToastTypes } from "../../store/reducers/toastSlice";
import serverApi from "../../services/serverApi";
import { useNavigate } from "react-router-dom";
import ValueDisplay from "@osn/common-ui/lib/Chain/ValueDisplay";
import { getSymbolByChain } from "@osn/common-ui/lib/utils/tokenValue";
import Preview from "@osn/common-ui/lib/Preview";
import { useApi } from "../../utils/hooks";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";

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

const Grey = styled.div`
  border: 1px solid #e2e8f0;
  background: #fbfcfe;
`;

const Header = styled.span`
  color: #506176;
`;

export default function Create() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rewardAmount, setRewardAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const navigate = useNavigate();
  const symbol = getSymbolByChain(account.network);
  const [balance, setBalance] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    (async () => {
      if (api) {
        const lastHdr = await api.rpc.chain.getHeader();
        const { data: balanceNow } = await api.query.system.account.at(
          lastHdr.hash,
          account.address
        );
        setBalance(balanceNow?.toJSON()?.free);
      }
    })();
  }, [account.address, api]);

  const onPublish = async () => {
    if (!api) {
      return;
    }

    let formValidateErrMsg = null;
    if (!title) {
      formValidateErrMsg = "Title must not be empty";
    }
    if (!content) {
      formValidateErrMsg = "Content must not be empty";
    }
    if (isNaN(rewardAmount) || rewardAmount <= 0) {
      formValidateErrMsg = "Reward must be a valid number";
    }
    if (formValidateErrMsg) {
      return dispatch(
        addToast({
          type: ToastTypes.Error,
          message: formValidateErrMsg,
        })
      );
    }
    setLoading(true);

    const data = { title, content, language: "en" };
    const cid = await cidOf(data);

    const interaction = new NewInteraction("N", rewardAmount, cid);
    const remark = new InteractionEncoder(interaction).getRemark();

    try {
      const { blockHash, extrinsicIndex } = await submitRemark(api, remark, account);

      const payload = {
        data,
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      serverApi.post(`/topics/`, payload).then(({ result }) => {
        if (result?.cid) {
          navigate(`/topic/${result.cid}`);
        }
      });

    } catch (e) {
      if (e.toString() === "Error: Cancelled") {
        return;
      }

      return dispatch(
        addToast({
          type: ToastTypes.Error,
          message: e.toString(),
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Main>
        <h4>Title</h4>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Input title here..."
          disabled={loading}
        />
        <h4>Topic</h4>
        {!showPreview ? (
          <MarkdownEditor {...{ content, setContent, disabled: loading }} />
        ) : (
          <Preview content={content} />
        )}
        <Button
          onClick={() => {
            setShowPreview(!showPreview);
          }}
        >
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </Main>
      <Side>
        {account ? (
          <Box>
            <FlexBetween>
              <SubTitle>Network</SubTitle>
              <img src="/imgs/icons/network.svg" alt="" />
            </FlexBetween>
            <Grey>
              <ChainItem chainName={account.network} />
            </Grey>
            <FlexBetween>
              <SubTitle>Reward</SubTitle>
              <img src="/imgs/icons/lanyard.svg" alt="" />
            </FlexBetween>
            <AmountInput
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              symbol={symbol}
            />
            <FlexBetween>
              <Header>Balance</Header>
              <ValueDisplay value={balance} chain={account.network} showAEM />
            </FlexBetween>
            <Button onClick={onPublish} primary disabled={!account}>
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
