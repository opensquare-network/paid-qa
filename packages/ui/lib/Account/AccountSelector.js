import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledDropdown from "../styled/Dropdown";
import AccountItem from "./AccountItem";

const Wrapper = styled.div``;

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
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default AccountSelector;
