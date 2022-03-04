import styled from "styled-components";
import Avatar from "./Avatar";
import ChainIcon from "../Chain/ChainIcon";
import { useDispatch } from "react-redux";
import { logout } from "site/src/store/reducers/accountSlice";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 0;
    > :first-child {
      margin-top: 20px;
    }

    > :last-child {
      margin-bottom: 20px;
    }

    margin: 0;
    width: 100%;
    text-align: center;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    .ui--IdentityIcon {
      display: flex !important;
      align-items: center !important;
    }
  }

  > div > :first-child {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  > div > :nth-child(2) {
    margin-right: 4px;
  }

  .button,
  .connect {
    width: 100%;
  }
`;

const AccountWrapperPC = styled(AccountWrapper)`
  border: 1px solid #e2e8f0;

  :hover {
    border: 1px solid #b7c0cc;
  }

  ${(p) =>
    p.show &&
    css`
      border: 1px solid #b7c0cc;
    `}
  padding: 7px 15px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 240px;
  position: absolute;
  right: 0;
  top: 100%;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  padding: 16px;
  padding-bottom: 8px;
  z-index: 1;
  @media screen and (max-width: 800px) {
    margin-top: 19px;
    border: none;
    box-shadow: none;
    width: 100%;
    position: initial;
    padding: 0;
    border-bottom: 20px solid white;
  }

  .connect {
    margin: auto;
  }
`;

const MenuItem = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #506176;

  :hover {
    color: #1e2134;
  }
`;

export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

function ConnectedAccount({ account, showNetwork, showMenu, setShowMenu }) {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    setShowMenu(false);
  };

  const Menu = (
    <MenuWrapper onClick={(e) => e.stopPropagation()}>
      {account && (
        <>
          <AccountWrapper>
            <div>
              <Avatar address={account.address} size={20} />
              {showNetwork && (
                <ChainIcon chainName={account?.network} size={16} />
              )}
              <>{addressEllipsis(account.address)}</>
            </div>
            {/*<UserIcon />*/}
          </AccountWrapper>
          <MenuDivider />
          <MenuItem>
            <LogoutWrapper onClick={onLogout}>
              Log out
              <img src="/imgs/icons/logout.svg" alt="" />
            </LogoutWrapper>
          </MenuItem>
        </>
      )}
    </MenuWrapper>
  );

  return (
    <Wrapper>
      <AccountWrapperPC
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <div>
          <Avatar address={account.address} size={20} />
          {showNetwork && <ChainIcon chainName={account?.network} size={16} />}
          {/*todo: Identity*/}
          {addressEllipsis(account.address)}
        </div>
      </AccountWrapperPC>
      {showMenu && <>{Menu}</>}
    </Wrapper>
  );
}

export default ConnectedAccount;
