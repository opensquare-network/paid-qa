import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import getApi from "ui/lib/services/chain/api";
import { accountSelector } from "../store/reducers/accountSlice";
import { activeChainNodeSelector } from "../store/reducers/nodeSlice";
import { clearUnread } from "../store/reducers/notificationSlice";
import serverApi from "../services/serverApi";
import { EmptyList, tabRouterMap } from "./constants";

export function useApi() {
  const account = useSelector(accountSelector);
  const nodeUrl = useSelector(activeChainNodeSelector(account?.network));
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!account?.address || !account?.network || !nodeUrl) {
      setApi(null);
      return;
    }

    (async () => {
      await web3Enable("paidQA");
      const injector = await web3FromAddress(account.address);
      const api = await getApi(account.network, nodeUrl);
      api.setSigner(injector.signer);
      setApi(api);
    })();
  }, [account?.address, account?.network, nodeUrl]);

  return api;
}

export function useNotifications(page, account, tab, setPage) {
  const pageSize = 10;
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    setNotifications(null);
    setPage(1);
  }, [tab]);

  useEffect(() => {
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
          } else {
            setNotifications(EmptyList);
          }
        });
    }
  }, [account?.network, account?.address, page, tab]);
  return notifications;
}
