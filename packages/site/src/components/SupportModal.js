import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";
import BigNumber from "bignumber.js";

import Modal from "@osn/common-ui/lib/Modal";
import styled from "styled-components";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./NetworkAssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi } from "utils/hooks";
import { hexToString } from "@polkadot/util";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
  updatePendingToast,
} from "store/reducers/toastSlice";
import { fetchTopic } from "store/reducers/topicSlice";
import debounce from "lodash.debounce";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import {
  p_14_medium,
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import BalanceInfo from "./BalanceInfo";

const { InteractionEncoder } = encoder;
const { SupportInteraction } = interactions;

const Wrapper = styled.div``;

const StyledTitle = styled.header`
  ${p_20_semibold};
  line-height: 28px;
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px !important;
`;

const StyledDescription = styled.p`
  ${p_14_normal};
  margin-bottom: 0.5rem;
  color: #506176;
`;

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: #1e2134;
  margin: 0;
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
    dispatch(newErrorToast(message));
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
    dispatch(newPendingToast(toastId, "Waiting for signing..."));

    try {
      const { blockHash, extrinsicIndex } = await submitRemark(
        api,
        remark,
        account,
        (status) => {
          dispatch(updatePendingToast(toastId, status));
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
        dispatch(newSuccessToast("Support added"));
        isMounted.current && dispatch(fetchTopic(topicCid));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(e.message));
    } finally {
      dispatch(removeToast(toastId));
    }
  };

  return (
    <Wrapper>
      <Modal open={open} setOpen={setOpen} okText="Confirm" onOk={doConfirm}>
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
          <StyledText>Asset</StyledText>
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

        <BalanceInfo account={account} tokenIdentifier={tokenIdentifier} />

        <StyledDescription>
          Promise amount is not limited by the balance.
        </StyledDescription>
      </Modal>
    </Wrapper>
  );
}
