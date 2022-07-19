import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";

import Card from "@osn/common-ui/lib/styled/Card";
import Item from "./Item";
import { accountSelector } from "store/reducers/accountSlice";
import SupportModal from "components/SupportModal";
import { calcSponserRewards } from "utils/rewards";
import { isSamePublicKey } from "@osn/common/src/utils/address";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import { Button } from "@osn/common-ui";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import Tooltip from "@osn/common-ui/lib/Tooltip";
import ConnectWallet from "components/ConnectWallet";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  ${p_16_semibold};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentWrapper = styled.div`
  padding: 16px 0 4px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
`;

const GreyText = styled.p`
  color: #a1a8b3;
  text-align: center;
  ${p_14_normal};
`;

export default function Promises({ topicCid, rewards, resolves, resolved }) {
  const account = useSelector(accountSelector);
  const [openSupportModel, setOpenSupportModel] = useState(false);
  // At least one promise exists which is support by topic creator
  const isLoading = !(rewards?.length > 0);
  const showSupport = !isLoading && !resolved;
  const [connectWalletModalVisible, setConnectWalletModalVisible] =
    useState(false);

  const sumUpRewards = calcSponserRewards(rewards, true);

  return (
    <Card>
      <Title className="flex items-center justify-between">
        <Left>
          <span>Supports</span>
          <Tooltip
            content={`Additional fund promises besides the original promise from OP`}
            size="fit"
          >
            <div>
              <FlexCenter>
                <img src="/imgs/icons/info.svg" alt="" />
              </FlexCenter>
            </div>
          </Tooltip>
        </Left>
        <img src="/imgs/icons/promise.svg" alt="" />
      </Title>
      <ContentWrapper>
        {isLoading ? (
          <FlexCenter style={{ marginTop: 0 }}>
            <Loading />
          </FlexCenter>
        ) : (
          sumUpRewards?.length === 0 && (
            <GreyText>No current supporters</GreyText>
          )
        )}
        {sumUpRewards.map((reward, index) => {
          const resolve = resolves?.find((resolve) =>
            isSamePublicKey(resolve.sponsor, reward.sponsor)
          );
          return <Item key={index} reward={reward} resolve={resolve} />;
        })}
      </ContentWrapper>
      {showSupport && (
        <ButtonContainer>
          {account ? (
            <Button block large onClick={() => setOpenSupportModel(true)}>
              Support
            </Button>
          ) : (
            <>
              <ConnectWallet
                visible={connectWalletModalVisible}
                setVisible={setConnectWalletModalVisible}
              />
            </>
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
