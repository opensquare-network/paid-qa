import React, { useState } from "react";
import styled, { css } from "styled-components";
import SelectOption from "./SelectOption";
import { netural_grey_300, netural_grey_500 } from "../../lib/styles/colors";
import { ReactComponent as CaretDown } from "../imgs/icons/caret-down.svg";

const SelectWrapper = styled.div`
  position: relative;
  user-select: none;
  border: 1px solid;
  border-color: ${netural_grey_300};
  cursor: pointer;

  &:hover {
    border-color: ${netural_grey_500};
  }

  ${(p) =>
    p.active &&
    css`
      border-color: ${netural_grey_500};
    `}

  .osn-select-selector {
    // height: 100%;
    min-height: 48px !important;
    border-radius: 0 !important;
    border-color: ${netural_grey_300} !important;

    &:hover,
    &:active,
    &:focus {
      border-color: ${netural_grey_500} !important;
    }

    &.active {
      .menu {
        border-color: ${netural_grey_500} !important;

        .item {
          padding: 0 !important;
        }
      }

      & + .osn-select-value {
        .osn-select-caret-down {
          transform: rotate(180deg);
        }
      }
    }

    .menu {
      border-radius: 0 !important;
    }

    .dropdown.icon {
      display: none;
    }
  }
`;

const SelectHead = styled(SelectOption)`
  // position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
`;

function noop() {}

function defaultOptionRender(option) {
  return option.content;
}

function Select(props) {
  const {
    value,
    options = [],
    size,
    onSelect = noop,
    optionRender = defaultOptionRender,
    ...restProps
  } = props;

  const [active, setActive] = useState(false);

  const selectOptions = options.map((option, index) => {
    return {
      ...option,
      content: <SelectOption>{optionRender(option, index)}</SelectOption>,
    };
  });

  return (
    <SelectWrapper
      {...restProps}
      active={active}
      className="osn-select"
      onClick={() => setActive(!active)}
    >
      <SelectHead className="osn-select-head">
        {optionRender(options.find((option) => option.value === value)) ?? {}}
        <CaretDown className="osn-select-caret-down" />
      </SelectHead>

      {active && <div>asd</div>}
    </SelectWrapper>
  );
}

Select.Option = SelectOption;

export default Select;
