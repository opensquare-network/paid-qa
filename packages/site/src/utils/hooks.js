import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getApi from "@osn/common/src/services/chain/api";
import { accountSelector } from "../store/reducers/accountSlice";
import { activeChainNodeSelector } from "../store/reducers/nodeSlice";
import serverApi from "../services/serverApi";
import { EmptyList, tabRouterMap } from "./constants";
import { encodeNetworkAddress } from "@osn/common/src";
import { unreadSelector } from "store/reducers/notificationSlice";

export function useApi() {
  const account = useSelector(accountSelector);
  const nodeUrl = useSelector(activeChainNodeSelector(account?.network));
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!account?.network || !nodeUrl) {
      setApi(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    (async (signal) => {
      const api = await getApi(account.network, nodeUrl);
      if (signal.aborted) {
        return;
      }
      setApi(api);
    })(signal);

    return () => {
      abortController.abort();
      setApi(null);
    }; //clean up
  }, [account?.network, nodeUrl]);

  return api;
}

export function useNotifications(page, account, tab, setPage) {
  const pageSize = 10;
  const [notifications, setNotifications] = useState(EmptyList);
  const [isLoading, setIsLoading] = useState(true);
  const unread = useSelector(unreadSelector);
  const [prevUnread, setPrevUnread] = useState(unread);

  const refresh = useCallback(() => {
    if (account?.network && account?.address) {
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
          }
        });
    }
  }, [account?.network, account?.address, tab, page, pageSize]);

  useEffect(() => {
    // Got new notifications
    if (unread > prevUnread) {
      refresh();
    }

    setPrevUnread(unread);
  }, [unread, prevUnread, refresh]);

  useEffect(() => {
    setNotifications(null);
    setPage(1);
  }, [setPage, tab]);

  useEffect(() => {
    if (account?.network && account?.address) {
      setIsLoading(true);
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
  }, [account?.network, account?.address, page, tab]);

  return [isLoading, notifications, refresh];
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

export const useIsOwner = (ownerAddress, network) => {
  const account = useSelector(accountSelector);
  return (
    account?.address &&
    encodeNetworkAddress(account?.address, network) ===
      encodeNetworkAddress(ownerAddress, network)
  );
};
