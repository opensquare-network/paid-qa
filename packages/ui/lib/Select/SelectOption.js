import React from "react";
import styled from "styled-components";

const Option = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 12px 16px;
`;

function SelectOption(props) {
  const { children, ...restProps } = props;

  return <Option {...restProps}>{children}</Option>;
}

export default SelectOption;
