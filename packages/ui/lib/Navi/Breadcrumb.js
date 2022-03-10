import styled from "styled-components";

import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    background: #ffffff;
    border: 1px solid #f0f3f8;
    border-radius: 18px;
    cursor: pointer;
    box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
      0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  }
  > :nth-child(2) {
    display: flex;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #a1a8b3;
    > :first-child {
      color: #1e2134;
    }
    > :not(:first-child) {
      margin-left: 8px;
    }
  }
`;

export default function Breadcrumb({ value }) {
  return (
    <Wrapper>
      <Link to="/">
        <img src="/imgs/icons/caret-left.svg" alt="" />
      </Link>
      <div>
        <Link to="/">Explorer</Link>
        <div>/</div>
        <div>{value}</div>
      </div>
    </Wrapper>
  );
}
