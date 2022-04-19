import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { hexToString } from "@polkadot/util";
import { useApi } from "../utils/hooks";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import { ReactComponent as Loading } from "imgs/icons/loading.svg";
import styled from "styled-components";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { p_14_medium } from "@osn/common-ui/lib/styles/textStyles";
import { getSymbolByChain } from "@osn/common/src/utils/tokenValue";
import ValueDisplay from "@osn/common-ui/lib/Chain/ValueDisplay";

const Wrapper = styled(FlexBetween)`
  margin-top: 8px;
  ${p_14_medium};
  line-height: 25px;

  > :first-child {
    color: #506176;
  }

  > :last-child {
    display: flex;
    align-items: center;
    color: #1e2134;
  }
`;

export default function BalanceInfo({ account, tokenIdentifier = "N" }) {
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState(0);
  const [balance, setBalance] = useState("0");
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
        return;
      }

      let balance;
      if (assetId === "N") {
        const systemBalance = await api.query.system.account(account.address);
        const {
          data: { free },
        } = systemBalance.toJSON();
        balance = free;
      } else {
        const assetAccount = await api.query.assets.account(
          assetId,
          account?.address
        );
        const { balance: hexBalance } = assetAccount.toJSON();
        balance = hexBalance;
      }
      if (isMounted.current) {
        setBalance(balance);
        setLoadingBalance(false);
      }
    }, 300);
  }, [api, account?.address, isMounted]);

  useEffect(() => {
    setLoadingBalance(true);
    setLoadingSymbol(true);
    fetchAssetBalance(tokenIdentifier);
    fetchAssetSymbol(tokenIdentifier);
  }, [fetchAssetBalance, fetchAssetSymbol, tokenIdentifier]);

  return (
    <Wrapper>
      <span>Balance</span>
      <div>
        {loadingBalance || loadingSymbol ? (
          <Loading />
        ) : (
          <ValueDisplay
            value={balance}
            decimals={decimals}
            symbol={symbol || getSymbolByChain(account?.network)}
            showAEM
          />
        )}
      </div>
    </Wrapper>
  );
}
