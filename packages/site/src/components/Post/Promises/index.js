import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import { accountSelector } from "store/reducers/accountSlice";
import { popUpConnect } from "store/reducers/showConnectSlice";
import SupportModal from "components/SupportModal";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ContentWrapper = styled.div`
  padding: 16px 0 4px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

const SupportButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;

  width: 236px;
  height: 48px;

  border: 1px solid #b7c0cc;
  box-sizing: border-box;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
`;

const ConnectButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;

  position: static;
  width: 236px;
  height: 48px;

  background: #191e27;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
`;

export default function Promises({ topicCid, rewards }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [openSupportModel, setOpenSupportModel] = useState(false);

  //TODO: show empty rewards pages
  if (!rewards || rewards.length === 0) {
    return null;
  }

  return (
    <Card>
      <Title className="flex items-center justify-between">
        <div>Promises</div>
        <img src="/imgs/icons/support.svg" alt="" />
      </Title>
      <ContentWrapper>
        {rewards.map((reward, index) => (
          <Item key={index} reward={reward} />
        ))}
      </ContentWrapper>
      <ButtonContainer>
        {account ? (
          <SupportButton onClick={() => setOpenSupportModel(true)}>Support</SupportButton>
        ) : (
          <ConnectButton onClick={() => dispatch(popUpConnect())}>
            Conect Wallet
          </ConnectButton>
        )}
      </ButtonContainer>
      <SupportModal topicCid={topicCid} open={openSupportModel} setOpen={setOpenSupportModel} />
    </Card>
  );
}
