import Input from "ui/lib/styled/Input";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12px;
    right: 16px;
  }
`;

function AmountInput({ value, onChange, symbol }) {
  return (
    <Wrapper>
      <Input {...{ value, onChange }} placeholder="0.00" />
      <span>{symbol}</span>
    </Wrapper>
  );
}

export default AmountInput;
