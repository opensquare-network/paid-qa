import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import getApi from "@osn/common/services/chain/api";
import { accountSelector } from "../store/reducers/accountSlice";
import { activeChainNodeSelector } from "../store/reducers/nodeSlice";
import serverApi from "../services/serverApi";
import { EmptyList, PROJECT_NAME, tabRouterMap } from "./constants";

export function useApi() {
  const account = useSelector(accountSelector);
  const nodeUrl = useSelector(activeChainNodeSelector(account?.network));
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!account?.address || !account?.network || !nodeUrl) {
      setApi(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    (async (signal) => {
      await web3Enable(PROJECT_NAME);
      const injector = await web3FromAddress(account.address);
      const api = await getApi(account.network, nodeUrl);
      api.setSigner(injector.signer);
      if (signal.aborted) {
        return;
      }
      setApi(api);
    })(signal);
    return () => {
      abortController.abort();
      setApi(null);
    }; //clean up
  }, [account?.address, account?.network, nodeUrl]);

  return api;
}

export function useNotifications(page, account, tab, setPage) {
  const pageSize = 10;
  const [notifications, setNotifications] = useState({ items: null, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNotifications(null);
    setPage(1);
  }, [setPage, tab]);

  useEffect(() => {
    if (account?.network && account?.address) {
      setIsLoading(true);
      setNotifications({ items: null, total: notifications.total });
      serverApi
        .fetch(
          `/network/${account.network}/address/${
            account.address
          }/${tabRouterMap.get(tab)}`,
          { page, pageSize }
        )
        .then(({ result }) => {
          if (result) {
            setNotifications(result);
          } else {
            setNotifications(EmptyList);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [account?.network, account?.address, page, tab, notifications.total]);
  return [isLoading, notifications];
}

export const useBalance = (account, api) => {
  const [balance, setBalance] = useState();

  useEffect(() => {
    (async () => {
      setBalance(undefined);
      if (api) {
        const lastHdr = await api.rpc.chain.getHeader();
        const { data: balanceNow } = await api.query.system.account.at(
          lastHdr.hash,
          account.address
        );
        setBalance(balanceNow?.toJSON()?.free);
      }
    })();
  }, [account?.address, account?.network, api]);

  return balance;
};
