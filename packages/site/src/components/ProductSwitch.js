import Flex from "ui/lib/styled/Flex";
import styled from "styled-components";
import { p_12_normal } from "../styles/textStyles";

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  height: 40px;
  cursor: pointer;
  .color {
    display: none;
  }
  ul {
    display: none;
  }
  &:hover {
    .monochrome {
      display: none;
    }
    ul,
    .color {
      display: initial;
    }
  }

  > img {
    width: 24px;
    margin-right: 8px;
  }
`;

const Products = styled.ul`
  all: unset;
  position: absolute;
  top: 60px;
  z-index: 1;
  padding: 16px 16px 0 16px;
  width: 360px;
  background: white;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const Product = styled.li`
  all: unset;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 42px;
  color: #506176;
  &:hover {
    color: #1e2134;
    p {
      ::before {
        background-image: url("/imgs/icons/caret-right-dark.svg");
      }
    }
  }
  p {
    all: unset;
    width: 100%;
    ::before {
      content: "";
      background-image: url("/imgs/icons/caret-right.svg");
      float: right;
      height: 24px;
      width: 24px;
    }
  }
  div {
    flex-grow: 1;
    flex-wrap: wrap;
  }
  span {
    ${p_12_normal};
    color: #a1a8b3;
  }
`;

function ProductSwitch() {
  return (
    <AppWrapper>
      <img className="monochrome" src="/imgs/icons/apps.svg" alt="" />
      <img className="color" src="/imgs/icons/apps-color.svg" alt="" />
      Paid QA
      <Products>
        <Product>
          <img src="/imgs/icons/voting.svg" width={24} alt="" />
          <Flex>
            <p>Off-chain Voting</p>
            <span>Multi-chain assets off-chain voting platform</span>
          </Flex>
        </Product>
        <Product>
          <img src="/imgs/icons/qa.svg" width={24} alt="" />
          <Flex>
            <p>Paid QA</p>
            <span>Decentralized paid QA platform</span>
          </Flex>
        </Product>
      </Products>
    </AppWrapper>
  );
}

export default ProductSwitch;
