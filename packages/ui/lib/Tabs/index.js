import styled, { css } from "styled-components";
import { p_16_semibold } from "@osn/common-ui/lib/styles/textStyles";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { no_scroll_bar } from "@osn/common-ui/lib/styles/componentCss";

const Wrapper = styled.div`
  overflow-x: scroll;
  ${no_scroll_bar};
  display: flex;

  > :not(:first-child) {
    margin-left: 40px;
  }
`;

const Item = styled(DividerWrapper)`
  cursor: pointer;
  padding-bottom: 20px;

  > :first-child {
    display: flex;
    align-items: center;
    ${p_16_semibold};

    > :not(:first-child) {
      margin-left: 4px;
    }
  }

  > :nth-child(2) {
    color: #a1a8b3;
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
      {items.map((item, index) => {
        if (item === "divider") {
          return <Divider key={index} />;
        }
        return (
          <Item
            key={index}
            active={value === item.value}
            onClick={() => setValue(item.value)}
          >
            <Capitalize>{item.value}</Capitalize>
            {item.suffix !== undefined && <span>{item.suffix}</span>}
          </Item>
        );
      })}
    </Wrapper>
  );
}
