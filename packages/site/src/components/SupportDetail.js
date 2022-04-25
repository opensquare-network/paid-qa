import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";

import styled from "styled-components";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import Toggle from "@osn/common-ui/lib/Toggle";
import AssetSelector from "./NetworkAssetSelector";
import AmountInput from "./AmountInput";
import AssetInput from "./AssetInput";
import { useApi } from "utils/hooks";
import { hexToString } from "@polkadot/util";
import debounce from "lodash.debounce";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import {
  p_14_medium,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import BalanceInfo from "./BalanceInfo";

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px !important;
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

export default function SupportDetail({
  tokenIdentifier,
  setTokenIdentifier,
  inputAmount,
  setInputAmount,
}) {
  const account = useSelector(accountSelector);
  const [manualOn, setManualOn] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [symbol, setSymbol] = useState("");
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
  }, [fetchAssetSymbol, manualOn, tokenIdentifier, setTokenIdentifier]);

  useEffect(() => {
    if (!manualOn && selectedAsset) {
      setTokenIdentifier(selectedAsset.tokenIdentifier);
      setSymbol(selectedAsset.symbol);
    }
  }, [selectedAsset, manualOn, setTokenIdentifier]);

  console.log(account);

  return (
    <>
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
        <AssetSelector network={account?.network} setAsset={setSelectedAsset} />
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
    </>
  );
}
