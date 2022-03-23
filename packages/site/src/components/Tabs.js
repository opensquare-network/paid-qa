import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 40px;
  }
`;

const Item = styled.div`
  cursor: pointer;
  padding-bottom: 20px;

  > :first-child {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    > :not(:first-child) {
      margin-left: 4px;
    }
  }

  ${(p) =>
    p.active &&
    css`
      padding-bottom: 17px;
      border-bottom: solid 3px #04d2c5;
    `}
`;

const Divider = styled.div`
  background: #e2e8f0;
  width: 1px;
  height: 16px;
  margin-top: 4px;
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

export default function Tabs({ items = [], value, setValue }) {
  return (
    <Wrapper>
      {items.map((item) => {
        if (item === "divider") {
          return <Divider />;
        }
        return (
          <Item active={value === item} onClick={() => setValue(item)}>
            <Capitalize>{item}</Capitalize>
          </Item>
        );
      })}
      <Divider />
    </Wrapper>
  );
}
