import styled from "styled-components";

import ConnectWallet from "../ConnectWallet";
import Input from "../Input";
import MarkdownEditor from "ui/lib/Editor/MarkdownEditor";
import Button from "../styled/button";
import { accountSelector } from "../../store/reducers/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "ui/lib/styled/SubTitle";
import ChainItem from "ui/lib/Chain/ChainSelectItem";
import AmountInput from "../AmountInput";
import FlexBetween from "ui/lib/styled/FlexBetween";
import { useState } from "react";
import { cidOf } from "../../services/ipfs";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import getApi from "ui/lib/services/chain/api";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  > :first-child {
    flex-grow: 1;

    > :not(:first-child) {
      margin-top: 20px;
    }
  }

  > :nth-child(2) {
    flex: 0 0 300px;
    margin-left: 20px;
  }
`;

const Box = styled.div`
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  border: 1px solid #f0f3f8;
  padding: 32px;

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

  const onPublish = async () => {
    if (!title || !content) {
      return alert("no title | content");
    }
    const cid = await cidOf({ title, content, language: "en" });
    await web3Enable("paidQA");
    const injector = await web3FromAddress(account.address);
    // todo: remove these hard-coded statement
    const api = await getApi("substrate", "wss://westend-rpc.dwellir.com");
    api.setSigner(injector.signer);
    api.tx.system
      .remark(`osn:q:1:N:N:1:${cid}`)
      .signAndSend(account.address)
      .then((res) => {
        console.log(res);
        //todo: read the response & get blockHash, extrinsicId
      });
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
        />
        <h4>Topic</h4>
        <MarkdownEditor {...{ content, setContent }} />
        <Button>Preview</Button>
      </Main>
      <Side>
        {!account && (
          <Box>
            <ConnectWallet onClick={() => dispatch(popUpConnect())} />
          </Box>
        )}
        <Box>
          <FlexBetween>
            <SubTitle>Network</SubTitle>
            <img src="/imgs/icons/network.svg" alt="" />
          </FlexBetween>
          <Grey>
            <ChainItem chainName="polkadot" />
          </Grey>
          <FlexBetween>
            <SubTitle>Reward</SubTitle>
            <img src="/imgs/icons/lanyard.svg" alt="" />
          </FlexBetween>
          <AmountInput
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            symbol="DOT"
          />
          <FlexBetween>
            <Header>Balance</Header>
            <span>0.50 DOT</span>
          </FlexBetween>
          <Button onClick={onPublish} primary disabled={!account}>
            Post
          </Button>
        </Box>
      </Side>
    </Wrapper>
  );
}
