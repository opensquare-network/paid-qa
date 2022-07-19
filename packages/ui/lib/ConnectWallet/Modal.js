import { useEffect, useState } from "react";
import { usePolkadotExtension } from "./usePolkadotExtension";
import { useModal } from "./useModal";

export default function ConnectWalletModal({
  availableNetworks = [],
  projectName,
  onConnect = () => {},
  visible,
  setVisible = () => {},
}) {
  const [chain, setChain] = useState(availableNetworks[0]);
  const [address, setAddress] = useState();
  const [normalizedAccounts, setNormalizedAccounts] = useState([]);

  const {
    isReady,
    accounts,
    hasExtension,
    isPolkadotExtensionAccessible,
    execute,
  } = usePolkadotExtension(projectName);

  useEffect(() => {
    if (visible) {
      execute();
    }
  }, [visible]);

  const { modal } = useModal({
    visible,
    setVisible,
    chain,
    setChain,
    address,
    setAddress,
    availableNetworks,
    onConnect,
    hasExtension,
    isPolkadotExtensionAccessible,
    accounts,
    isReady,
  });

  useEffect(() => {
    setNormalizedAccounts(
      (accounts || []).map(({ address, meta: { name } }) => ({ address, name }))
    );
  }, [accounts]);

  useEffect(() => {
    setAddress(normalizedAccounts[0]?.address);
  }, [normalizedAccounts]);

  return modal;
}
