import Input from "@osn/common-ui/lib/styled/Input";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 14px;
    right: 16px;
  }
`;

function AmountInput({ value, onChange, symbol }) {
  return (
    <Wrapper>
      <Input type="number" {...{ value, onChange }} placeholder="0.00" />
      <span>{symbol}</span>
    </Wrapper>
  );
}

export default AmountInput;
