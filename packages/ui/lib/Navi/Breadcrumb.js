import styled from "styled-components";

import { Link } from "react-router-dom";
import { ReactComponent as CaretLeft } from "../imgs/icons/caret-left.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > :nth-child(2) {
    > :not(:first-child) {
      margin-left: 8px;
    }
  }
`;

const Crumbs = styled.span`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1e2134;
`;

const DisabledCrumb = styled.span`
  color: #a1a8b3;
`;

const CursorLink = styled(Link)`
  cursor: pointer;
`;

const LeftIconLink = styled(CursorLink)`
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

  &:hover {
    border: 1px solid #e2e8f0;
    box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
      0px 0.751293px 8px rgba(26, 33, 44, 0.04);
  }
`;

export default function Breadcrumb({ value }) {
  return (
    <Wrapper>
      <LeftIconLink to="/">
        <CaretLeft />
      </LeftIconLink>
      <Crumbs>
        <CursorLink to="/">Explorer</CursorLink>
        <span>/</span>
        <DisabledCrumb>{value}</DisabledCrumb>
      </Crumbs>
    </Wrapper>
  );
}
