import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledDropdown from "../styled/Dropdown";
import AccountItem from "./AccountItem";
import { fetchIdentity } from "@osn/common/src/services/identity";

const Wrapper = styled.div`
  .ui.selection.dropdown .menu {
    @media only screen and (min-width: 768px) {
      max-height: 233px;
    }
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .ui.selection.dropdown .menu > .item {
    padding-left: 0 !important;
    padding-top: 3px !important;
    padding-bottom: 4px !important;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  z-index: 9;
  height: 64px;
`;

const AccountSelector = ({
  accounts,
  chain,
  onSelect = () => {},
  selected = "",
}) => {
  const identityMap = new Map();
  const [selectedIndex, setSelectedIndex] = useState(
    (() => {
      for (let index in accounts) {
        if (selected === accounts[index]?.address) {
          return parseInt(index);
        }
      }
      return 0;
    })()
  );

  accounts.forEach((account) => {
    fetchIdentity(chain.network, account.address).then((identity) => {
      if (!identity) {
        return;
      }
      identityMap.set(account.address, identity);
    });
  });

  useEffect(() => {
    onSelect(accounts[selectedIndex]);
  }, [accounts, onSelect, selectedIndex]);

  const options = accounts.map((item, index) => ({
    key: index,
    value: index,
    content: (
      <AccountItem
        accountName={item.name}
        accountAddress={item.address}
        chain={chain.network}
        identity={identityMap.get(item.address)}
      />
    ),
  }));

  return (
    <Wrapper>
      <DropdownWrapper>
        <StyledDropdown
          selection
          options={options}
          onChange={(_, { value }) => {
            setSelectedIndex(value);
          }}
          value={selectedIndex}
        />
        <AccountItem
          accountName={accounts?.[selectedIndex]?.name}
          accountAddress={accounts?.[selectedIndex]?.address}
          chain={chain.network}
          header
          identity={identityMap.get(accounts?.[selectedIndex]?.address)}
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default AccountSelector;
