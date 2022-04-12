import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";
import BigNumber from "bignumber.js";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./NetworkAssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi, useBalance } from "utils/hooks";
import { hexToString } from "@polkadot/util";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import {
  addToast,
  newToastId,
  ToastTypes,
  updateToast,
} from "store/reducers/toastSlice";
import { fetchTopic } from "store/reducers/topicSlice";
import debounce from "lodash.debounce";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import {
  p_14_medium,
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import ValueDisplay from "@osn/common-ui/lib/Chain/ValueDisplay";

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

  height: 48px;

  background: #fbfcfe;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;

  > :first-child {
    margin-right: 8px;
  }
`;

const ManualSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
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
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [loadingSymbol, setLoadingSymbol] = useState(false);
  const api = useApi();
  const balance = useBalance(account, api);
  const isMounted = useIsMounted();

  const fetchAssetSymbol = useMemo(() => {
    return debounce(async (assetId) => {
      if (!api || assetId === "N" || assetId === "") {
        setSymbol("");
        setLoadingSymbol(false);
        return;
      }
      const metadata = await api.query.assets.metadata(assetId);
      const { symbol: hexSymbol } = metadata.toJSON();
      const symbol = hexToString(hexSymbol);
      if (isMounted.current) {
        setSymbol(symbol);
        setLoadingSymbol(false);
      }
    }, 300);
  }, [api, isMounted]);

  useEffect(() => {
    if (manualOn) {
      if (tokenIdentifier === "N") {
        setTokenIdentifier("");
        return;
      }

      setLoadingSymbol(true);
      fetchAssetSymbol(tokenIdentifier);
    }
  }, [fetchAssetSymbol, manualOn, tokenIdentifier]);

  useEffect(() => {
    if (!manualOn && selectedAsset) {
      setTokenIdentifier(selectedAsset.tokenIdentifier);
      setSymbol(selectedAsset.symbol);
    }
  }, [selectedAsset, manualOn]);

  const showErrorToast = (message) => {
    dispatch(
      addToast({
        type: ToastTypes.Error,
        message,
      })
    );
    if (isMounted.current) {
      setOpen(false);
    }
  };

  const doConfirm = async () => {
    setOpen(false);

    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!api) {
      return showErrorToast("Network not connected yet");
    }

    if (!tokenIdentifier) {
      return showErrorToast("Token/Asset is missing");
    }

    if (!inputAmount) {
      return showErrorToast("Amount is missing");
    }

    if (new BigNumber(inputAmount).isNaN()) {
      return showErrorToast("Amount is invalid");
    }

    const interaction = new SupportInteraction(
      tokenIdentifier,
      inputAmount,
      topicCid
    );
    if (!interaction.isValid) {
      return showErrorToast("Interaction is invalid");
    }
    const remark = new InteractionEncoder(interaction).getRemark();

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
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/supports`,
        payload
      );
      if (result) {
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Success,
            message: "Support added",
          })
        );
        dispatch(fetchTopic(topicCid));
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
      dispatch(
        updateToast({
          id: toastId,
          sticky: false,
        })
      );
    }
  };

  const closeModal = () => setOpen(false);

  const closeButton = (
    <img onClick={closeModal} src="/imgs/icons/close.svg" width={24} alt="" />
  );

  return (
    <Wrapper>
      <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Promise</StyledTitle>
          <StyledDescription>
            Support the topic and promise rewards for answers. No need to deduct
            or lock up assets.
          </StyledDescription>

          <StyledText>Network</StyledText>
          <ChainWrapper>
            <ChainIcon chainName={account?.network} />
            <Text>{account?.network}</Text>
          </ChainWrapper>

          <ItemTitle>
            <FlexBetween style={{ flexBasis: "100%" }}>
              <StyledText>Asset</StyledText>
              <ValueDisplay value={balance} chain={account.network} showAEM />
            </FlexBetween>
            {account?.network === "statemine" && (
              <ManualSwitch>
                <span>Manual</span>
                <Toggle on={manualOn} setOn={setManualOn} />
              </ManualSwitch>
            )}
          </ItemTitle>
          {manualOn ? (
            <AssetInput
              value={tokenIdentifier}
              onChange={(e) => setTokenIdentifier(e.target.value)}
            />
          ) : (
            <AssetSelector
              network={account?.network}
              setAsset={setSelectedAsset}
            />
          )}

          <ItemTitle>
            <StyledText>Amount</StyledText>
          </ItemTitle>
          <AmountInput
            value={inputAmount}
            symbol={loadingSymbol ? <Loading /> : symbol}
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
