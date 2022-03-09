import styled from "styled-components";

// import Notification from "./Notification";
import ConnectModal from "./ConnectModal";
import { accountSelector } from "../store/reducers/accountSlice";
import { useRef, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import NodeSelect from "./NodeSelect";
import { useDispatch, useSelector } from "react-redux";
import ConnectedAccount from "./User/ConnectedAccount";
import { useOnClickOutside, useWindowSize } from "ui/lib/utils/hooks";
import useUpdateNodesDelay from "utils/useUpdateNodesDelay";
import {
  popUpConnect,
  showConnectSelector,
} from "../store/reducers/showConnectSlice";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import ProductSwitch from "./ProductSwitch";

const Wrapper = styled.header`
  position: relative;
  flex: 0 0 auto;
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 80px;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    min-height: 62px;
    padding: 15px 20px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  height: 36px;
  background-image: url("/imgs/opensquare-logo.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 48px;
    height: 32px;
    background-image: url("/imgs/opensquare-logo-icon.svg");
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background: #e2e8f0;
`;

const RightWrapper = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 16px;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const showConnect = useSelector(showConnectSelector);
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
    <Wrapper>
      <ContentWrapper>
        <LeftWrapper>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <Divider />
          <ProductSwitch />
        </LeftWrapper>
        <RightWrapper ref={ref}>
          {/*<Notification />*/}
          {windowSize.width > 768 ? (
            account ? (
              <>
                <ConnectedAccount
                  {...{ showMenu, setShowMenu, account }}
                  showNetwork
                />
                <NodeSelect small chain={account?.network} />
              </>
            ) : (
              <ConnectWallet onClick={() => dispatch(popUpConnect())} />
            )
          ) : (
            <>
              <MobileMenu />
            </>
          )}
          {showConnect && <ConnectModal />}
        </RightWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
