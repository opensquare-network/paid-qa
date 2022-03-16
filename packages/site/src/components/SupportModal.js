import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../styles/textStyles";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./AssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi } from "utils/hooks";
import { hexToString } from "@polkadot/util";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";

const { InteractionEncoder } = encoder;
const { SupportInteraction } = interactions;

const Wrapper = styled.div``;

const StyledModal = styled(Modal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

const StyledCard = styled.div`
  margin: 0 !important;
  padding: 24px !important;
  position: relative !important;
  width: 100% !important;
`;

const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledDescription = styled.p`
  ${p_14_normal};
  color: #506176;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: #1e2134;
  margin: 0;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
`;

const ChainWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;

  position: static;
  width: 352px;
  height: 48px;

  background: #FBFCFE;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
`;

const ManualSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export default function SupportModal({ open, setOpen, topicCid }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [manualOn, setManualOn] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [assetId, setAssetId] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  const api = useApi();
  useEffect(() => {
    if (api && manualOn && assetId) {
      api.query.assets.metadata(assetId).then((metadata) => {
        const { symbol } = metadata.toJSON();
        setSelectedAsset(hexToString(symbol));
      }).catch(() => {

      });
    }
  }, [api, manualOn, assetId]);

  const doConfirm = async () => {
    if (!api) {
      dispatch(
        addToast({
          type: ToastTypes.Error,
          message: "Network not connected yet",
        })
      );
      return;
    }

    if (!selectedAsset) {
      dispatch(
        addToast({
          type: ToastTypes.Error,
          message: "Asset is empty",
        })
      );
      return;
    }

    setLoading(true);

    const tokenIdentifier = selectedAsset;
    const interaction = new SupportInteraction(tokenIdentifier, inputAmount, topicCid);
    const remark = new InteractionEncoder(interaction).getRemark();

    try {
      const { blockHash, extrinsicIndex } = await submitRemark(api, remark, account);
      const payload = {
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      serverApi
        .post(`/topics/${topicCid}/supports`, payload)
        .then(({ result, error }) => {
          if (result) {
            setContent("");
            // After appendant is added, update the topic
            serverApi.fetch(`/topics/${topicCid}`).then(({ result }) => {
              if (result) {
                dispatch(setTopic(result));
              }
            });
          }

          if (error) {
            dispatch(
              addToast({
                type: ToastTypes.Error,
                message: error.message,
              })
            );
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

    setOpen(false);
  };

  const closeModal = () => setOpen(false);

  const closeButton = (
    <img onClick={closeModal} src="/imgs/icons/close.svg" width={24} alt="" />
  );

  return (
    <Wrapper>
      <StyledModal
        open={open}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Promise</StyledTitle>
          <StyledDescription>
            Support the topic and promise rewards for answers. No need to deduct or lock up assets.
          </StyledDescription>

          <StyledText>Network</StyledText>
          <ChainWrapper>
            <ChainIcon chainName={account?.network} />
            <div>
              <Text>{account?.network}</Text>
            </div>
          </ChainWrapper>

          <ItemTitle>
            <StyledText>Asset</StyledText>
            {account.network === "statemine" && <ManualSwitch>
              <span>Manual</span>
              <Toggle on={manualOn} setOn={setManualOn} />
            </ManualSwitch>}
          </ItemTitle>
          {manualOn ? (
            <AssetInput value={assetId} onChange={(e) => setAssetId(e.target.value)} />
          ) : (
            <AssetSelector setAsset={setSelectedAsset} />
          )}

          <ItemTitle>
            <StyledText>Amount</StyledText>
          </ItemTitle>
          <AmountInput
            value={inputAmount}
            symbol={selectedAsset}
            onChange={(e) => setInputAmount(e.target.value)}
          />

          <ActionBar>
            <Button primary onClick={doConfirm}>
              Confirm
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
