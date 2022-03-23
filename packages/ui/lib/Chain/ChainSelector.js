import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "../index";
import ChainItem from "./ChainSelectItem";

const Wrapper = styled.div`
  margin-bottom: 8px;
  .ui.selection.dropdown .menu > .item {
    padding: 0 !important;
    user-select: none; // prevent text high-lighted when user double-clicked/selected
  }
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
  const [isTopLayer, setIsTopLayer] = useState(false);
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
          onOpen={() => {
            setIsTopLayer(true);
          }}
          onClose={() => {
            setIsTopLayer(false);
          }}
          onChange={(_, { value }) => {
            setSelectedIndex(value);
          }}
        />
        <ChainItem
          chainName={chains[selectedIndex]?.network}
          header
          isTopLayer={isTopLayer}
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default ChainSelector;
