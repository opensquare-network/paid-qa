import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";
import BigNumber from "bignumber.js";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import {
  p_14_medium,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./NetworkAssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi } from "utils/hooks";
import { encoder, interactions } from "@paid-qa/spec";
import { submitFund } from "services/chainApi";
import {
  addToast,
  newToastId,
  ToastTypes,
  updateToast,
} from "store/reducers/toastSlice";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import serverApi from "services/serverApi";
import {
  fetchFundSummary,
  fetchTopic,
  topicSelector,
} from "store/reducers/topicSlice";
import { answersSelector, fetchAnswers } from "store/reducers/answerSlice";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import Flex from "@osn/common-ui/lib/styled/Flex";
import BalanceInfo from "./BalanceInfo";

const { InteractionEncoder } = encoder;
const { FundInteraction } = interactions;

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

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px;
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

const ChainWrapper = styled(Flex)`
  padding: 12px 16px;
  height: 48px;
  background: #fbfcfe;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;

  > :first-child {
    margin-right: 8px;
  }
`;

const ManualSwitch = styled(Flex)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const ItemTitle = styled(FlexBetween)`
  margin-top: 8px;
`;

const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

export default function FundModal({ open, setOpen, ipfsCid, beneficiary }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [manualOn, setManualOn] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [loadingSymbol, setLoadingSymbol] = useState(false);
  const isMounted = useIsMounted();
  const answers = useSelector(answersSelector);
  const topic = useSelector(topicSelector);

  const api = useApi();

  useEffect(() => {
    if (manualOn) {
      if (tokenIdentifier === "N") {
        setTokenIdentifier("");
        return;
      }
      setLoadingSymbol(true);
    }
  }, [manualOn, tokenIdentifier]);

  useEffect(() => {
    if (!manualOn && selectedAsset) {
      setTokenIdentifier(selectedAsset.tokenIdentifier);
      setSymbol(selectedAsset.symbol);
      setDecimals(selectedAsset.decimals);
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

    const interaction = new FundInteraction(ipfsCid);
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
      const { blockHash, extrinsicIndex } = await submitFund(
        api,
        remark,
        {
          tokenIdentifier,
          value: new BigNumber(inputAmount)
            .times(Math.pow(10, decimals))
            .toString(),
          to: beneficiary,
        },
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

      const { result, error } = await serverApi.post(`/funds`, payload);
      if (result) {
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Success,
            message: "Funded",
          })
        );
        // After fund is added, update the topic
        dispatch(fetchTopic(topic.cid));
        dispatch(fetchAnswers(topic.cid, answers.page));
        dispatch(fetchFundSummary(topic.cid));
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
          <StyledTitle>Fund</StyledTitle>
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
