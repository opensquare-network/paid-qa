import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import { accountSelector } from "store/reducers/accountSlice";
import { popUpConnect } from "store/reducers/showConnectSlice";
import SupportModal from "components/SupportModal";
import { calcSponserRewards } from "utils/rewards";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";
import { isSamePublicKey } from "@osn/common-ui/lib/utils/address";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import Button from "@osn/common-ui/lib/styled/Button";
import { p_16_semibold } from "@osn/common-ui/lib/styles/textStyles";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  ${p_16_semibold};
`;

const ContentWrapper = styled.div`
  padding: 16px 0 4px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

const SupportButton = styled(Button)`
  width: 204px;
  line-height: 32px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const ConnectButton = styled(Button)`
  width: 204px;
  line-height: 32px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
`;

export default function Promises({ topicCid, rewards, resolves }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [openSupportModel, setOpenSupportModel] = useState(false);
  // At least one promise exists which is support by topic creator
  const isLoading = !(rewards?.length > 0);

  const myResolve = resolves?.find(
    (resolve) =>
      account?.address && isSamePublicKey(resolve.sponsor, account.address)
  );

  const sumUpRewards = calcSponserRewards(rewards);

  return (
    <Card>
      <Title className="flex items-center justify-between">
        <div>Promises</div>
        <img src="/imgs/icons/promise.svg" alt="" />
      </Title>
      <ContentWrapper>
        {isLoading && (
          <FlexCenter style={{ marginTop: 0 }}>
            <Loading />
          </FlexCenter>
        )}
        {sumUpRewards.map((reward, index) => {
          const resolve = resolves?.find((resolve) =>
            isSamePublicKey(resolve.sponsor, reward.sponsor)
          );
          return <Item key={index} reward={reward} resolve={resolve} />;
        })}
      </ContentWrapper>
      {!myResolve && !isLoading && (
        <ButtonContainer>
          {account ? (
            <SupportButton onClick={() => setOpenSupportModel(true)}>
              Support
            </SupportButton>
          ) : (
            <ConnectButton onClick={() => dispatch(popUpConnect())} primary>
              Connect Wallet
            </ConnectButton>
          )}
        </ButtonContainer>
      )}
      <SupportModal
        topicCid={topicCid}
        open={openSupportModel}
        setOpen={setOpenSupportModel}
      />
    </Card>
  );
}
