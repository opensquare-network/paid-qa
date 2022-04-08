import { useState, useEffect, useCallback, useRef } from "react";
import {
  isWeb3Injected,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector, setAccount } from "../store/reducers/accountSlice";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import AccountSelector from "@osn/common-ui/lib/Account/AccountSelector";
import styled from "styled-components";
import ChainSelector from "@osn/common-ui/lib/Chain/ChainSelector";
import { AVAILABLE_NETWORKS } from "@osn/common-ui/lib/utils/constants";
import { closeConnect } from "../store/reducers/showConnectSlice";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import { polkadotWeb3Accounts } from "@osn/common-ui/lib/utils/extension";
import { useIsMounted } from "@osn/common-ui/lib/utils/hooks";

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

const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
`;

const StyledDescription = styled.p`
  ${p_14_normal};
  color: #506176;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
`;

export default function ConnectModal() {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(null);
  const account = useSelector(accountSelector);
  const [accounts, setAccounts] = useState([]);
  const [chain, setChain] = useState({ network: "polkadot" });
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(null);
  const availableNetworks = AVAILABLE_NETWORKS;

  const getAddresses = useCallback(async () => {
    const extensionAccounts = await polkadotWeb3Accounts();
    const accounts = (extensionAccounts || []).map((item) => {
      const {
        address,
        meta: { name },
      } = item;
      return {
        address,
        name,
      };
    });
    if (isMounted.current) {
      setAccounts(accounts);
      setAddress(accounts[0]?.address);
    }
  }, [isMounted]);

  useEffect(() => {
    (async () => {
      if (isMounted.current) {
        setHasExtension(isWeb3Injected);
      }
      if (!isWeb3Injected) {
        return;
      }
      const web3Apps = await web3Enable("PaidQA");
      const polkadotEnabled = web3Apps?.length > 0;
      if (isMounted.current) {
        setIsPolkadotAccessible(polkadotEnabled);
      }
      if (!polkadotEnabled) {
        return;
      }
      getAddresses();
    })();
  }, [isMounted, getAddresses]);

  const doConnect = async () => {
    try {
      dispatch(
        setAccount({
          address,
          network: chain.network,
        })
      );
      dispatch(closeConnect());
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => dispatch(closeConnect());

  const closeButton = (
    <img onClick={closeModal} src="/imgs/icons/close.svg" width={24} alt="" />
  );

  return (
    <Wrapper>
      <StyledModal
        open={isPolkadotAccessible && accounts.length > 0}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledText>Chain</StyledText>
          <ChainSelector
            chains={availableNetworks}
            onSelect={(chain) => setChain(chain)}
            selected={account?.network}
          />

          <StyledText>Account</StyledText>
          <AccountSelector
            accounts={accounts}
            onSelect={(account) => setAddress(account?.address)}
            chain={chain}
            selected={account?.address}
          />

          <ActionBar>
            <Button primary onClick={doConnect}>
              Connect
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={isPolkadotAccessible && accounts.length === 0}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension is connected, but no account found. Please
            create or import some accounts first.
          </StyledDescription>

          <ActionBar>
            <Button
              color="orange"
              onClick={() => {
                closeModal();
                const newWindow = window.open(
                  "https://polkadot.js.org/extension/",
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }}
            >
              Create/Import addresses
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={hasExtension === false}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension not detected. No web3 account could be found.
            Visit this page on a computer with polkadot-js extension.
          </StyledDescription>

          <ActionBar>
            <Button
              color="orange"
              onClick={() => {
                closeModal();
                const newWindow = window.open(
                  "https://polkadot.js.org/extension/",
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }}
            >
              Polkadot{`{.js}`} Extension
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={hasExtension && isPolkadotAccessible === false}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar></CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension is detected but unaccessible, please go to
            Polkadot-js extension, settings, and check Manage Website Access
            section.
          </StyledDescription>

          <ActionBar>
            <Button color="orange" onClick={closeModal}>
              Got it.
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
