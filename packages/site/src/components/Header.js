import React from "react";
import styled from "styled-components";

import { Header, Flex, FlexBetween } from "@osn/common-ui";
import NotificationBell from "./NotificationBell";
import { accountSelector } from "../store/reducers/accountSlice";
import { useRef, useState } from "react";
import NodeSelect from "./NodeSelect";
import { useSelector } from "react-redux";
import ConnectedAccount from "./User/ConnectedAccount";
import { useOnClickOutside, useWindowSize } from "@osn/common/utils/hooks";
import useUpdateNodesDelay from "utils/useUpdateNodesDelay";
import MobileMenu from "./MobileMenu";
import ProductSwitch from "./ProductSwitch";
import { MOBILE_SIZE } from "@osn/constants";
import { NavLink } from "react-router-dom";
import { ConnectWalletModal, ConnectWalletButton } from "./ConnectWallet";

const RightWrapper = styled(Flex)`
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

const ContentWrapper = styled(FlexBetween)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function PageHeader() {
  const windowSize = useWindowSize();
  const [connectWalletModalVisible, setConnectWalletModalVisible] =
    useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    // connect modal is at body level, doesn't contained in the <Header/>, so exclude manually
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    setShowMenu(false);
  });
  const account = useSelector(accountSelector);
  useUpdateNodesDelay(account?.network);

  return (
    <Header
      logoRender={(logo) => (
        <NavLink style={{ cursor: "pointer" }} to="/">
          {logo}
        </NavLink>
      )}
    >
      <ContentWrapper>
        <ProductSwitch />

        <RightWrapper ref={ref}>
          {windowSize.width > MOBILE_SIZE ? (
            account ? (
              <>
                <NotificationBell />
                <ConnectedAccount
                  {...{ showMenu, setShowMenu, account }}
                  showNetwork
                  setConnectWalletModalVisible={setConnectWalletModalVisible}
                />
                <NodeSelect small chain={account?.network} />
              </>
            ) : (
              <ConnectWalletButton setVisible={setConnectWalletModalVisible} />
            )
          ) : (
            <>
              <MobileMenu />
            </>
          )}

          <ConnectWalletModal
            visible={connectWalletModalVisible}
            setVisible={setConnectWalletModalVisible}
          />
        </RightWrapper>
      </ContentWrapper>
    </Header>
  );
}
