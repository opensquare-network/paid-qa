import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "../../store/reducers/accountSlice";

import styled from "styled-components";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import AssetSelector from "../NetworkAssetSelector";
import AmountInput from "../AmountInput";
import { ReactComponent as NetworkIcon } from "imgs/icons/network.svg";
import { ReactComponent as RewardIcon } from "imgs/icons/treasury.svg";
import {
  p_14_medium,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import BalanceInfo from "../BalanceInfo";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 0px !important;
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

const Field = styled.div`
  > :first-child {
    margin-bottom: 16px;
  }
`;

export default function RewardDetail({
  tokenIdentifier,
  setTokenIdentifier,
  inputAmount,
  setInputAmount,
  symbol,
  setSymbol,
  setDecimals,
}) {
  const account = useSelector(accountSelector);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    if (selectedAsset) {
      setTokenIdentifier(selectedAsset.tokenIdentifier);
      setSymbol(selectedAsset.symbol);
      setDecimals(selectedAsset.decimals);
    }
  }, [selectedAsset, setSymbol, setDecimals, setTokenIdentifier]);

  return (
    <>
      <Field>
        <FlexBetween>
          <StyledText>Network</StyledText>
          <NetworkIcon />
        </FlexBetween>
        <ChainWrapper>
          <ChainIcon chainName={account?.network} />
          <Text>{account?.network}</Text>
        </ChainWrapper>
      </Field>
      <Field>
        <FlexBetween>
          <StyledText>Reward</StyledText>
          <RewardIcon />
        </FlexBetween>
        <AssetSelector
          network={account?.network}
          setAsset={setSelectedAsset}
          hiddenOnSingleOption={true}
        />

        <AmountInput
          value={inputAmount}
          symbol={symbol}
          onChange={(e) => setInputAmount(e.target.value)}
        />

        <BalanceInfo account={account} tokenIdentifier={tokenIdentifier} />
      </Field>
    </>
  );
}
