import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";
import BigNumber from "bignumber.js";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import { p_16_semibold } from "../styles/textStyles";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./AssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi } from "utils/hooks";
import { hexToString } from "@polkadot/util";
import { encoder, interactions } from "@paid-qa/spec";
import { submitFund } from "services/chainApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import debounce from "lodash.debounce";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import serverApi from "services/serverApi";
import { setTopic } from "store/reducers/topicSlice";

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

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  > :first-child {
    color: #506176;
  }

  > :last-child {
    color: #1e2134;
  }
`;

export default function FundModal({ open, setOpen, ipfsCid, beneficiary }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [manualOn, setManualOn] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [balance, setBalance] = useState("0");
  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSymbol, setLoadingSymbol] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const isMounted = useIsMounted();

  const api = useApi();

  const fetchAssetSymbol = useMemo(() => {
    return debounce(async (assetId) => {
      if (!api || assetId === "N" || assetId === "") {
        setSymbol("");
        setDecimals(0);
        setLoadingSymbol(false);
        return;
      }
      const metadata = await api.query.assets.metadata(assetId);
      const { symbol: hexSymbol, decimals } = metadata.toJSON();
      const symbol = hexToString(hexSymbol);
      if (isMounted.current) {
        setSymbol(symbol);
        setDecimals(decimals);
        setLoadingSymbol(false);
      }
    }, 300);
  }, [api, isMounted]);

  const fetchAssetBalance = useMemo(() => {
    return debounce(async (assetId) => {
      if (!api || assetId === "" || !account?.address) {
        setBalance("0");
        setLoadingBalance(false);
        return;
      }

      let balance = "0";
      if (assetId === "N") {
        const systemBalance = await api.query.system.account(account.address);
        const {
          data: { free },
        } = systemBalance.toJSON();
        balance = new BigNumber(free).div(Math.pow(10, decimals)).toFixed();
      } else {
        const assetAccount = await api.query.assets.account(
          assetId,
          account.address
        );
        const { balance: hexBalance } = assetAccount.toJSON();
        balance = new BigNumber(hexBalance)
          .div(Math.pow(10, decimals))
          .toFixed();
      }
      if (isMounted.current) {
        setBalance(balance);
        setLoadingBalance(false);
      }
    }, 300);
  }, [api, account?.address, decimals, isMounted]);

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
    setLoadingBalance(true);
    fetchAssetBalance(tokenIdentifier);
  }, [tokenIdentifier, fetchAssetBalance]);

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
    setOpen(false);
  };

  const doConfirm = async () => {
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

    try {
      setLoading(true);

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
        account
      );
      const payload = {
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      serverApi.post(`/funds`, payload).then(({ result, error }) => {
        if (result) {
          // After fund is added, update the topic
          serverApi.fetch(`/topics/${ipfsCid}`).then(({ result }) => {
            if (result) {
              dispatch(setTopic(result));
            }
          });
        }

        if (error) {
          showErrorToast(error.message);
        }
      });
    } catch (e) {
      if (e.toString() === "Error: Cancelled") {
        return;
      }
      return showErrorToast(e.toString());
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
      <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
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

          <BalanceInfo>
            <span>Balance</span>
            <span>
              {loadingBalance || loadingSymbol ? (
                <Loading />
              ) : (
                `${balance} ${symbol}`
              )}
            </span>
          </BalanceInfo>

          <ActionBar>
            <Button isLoading={loading} primary onClick={doConfirm}>
              Confirm
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
