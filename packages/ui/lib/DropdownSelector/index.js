import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "../index";

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

const OptionWrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
`;

const Header = styled(OptionWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  padding: 0 16px;
`;

const DropdownSelector = ({ options = [], value, onSelect = () => {} }) => {
  return (
    <Wrapper>
      <DropdownWrapper>
        <StyledDropdown
          selection
          options={options}
          onChange={(_, { value }) => {
            onSelect(value);
          }}
        />
        <Header>{options.find(item => item.value === value)?.content}</Header>
      </DropdownWrapper>
    </Wrapper>
  );
};

export default DropdownSelector;
