import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "../index";
import ChainItem from "./ChainSelectItem";

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  height: 48px;
`;

const StyledDropdown = styled(Dropdown)`
  height: 48px !important;
`;

const ChainSelector = ({ chains = [], onSelect = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    onSelect(chains[selectedIndex]);
  }, [chains, onSelect, selectedIndex]);
  const options = chains.map((item, index) => ({
    key: index,
    value: index,
    content: <ChainItem chainName={item.network} />,
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
        />
        <ChainItem chainName={chains[selectedIndex]?.network} header />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default ChainSelector;
