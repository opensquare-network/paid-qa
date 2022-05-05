import React, { Fragment } from "react";
import styled from "styled-components";
import BreadcrumbItem from "./BreadcrumbItem";
import { ReactComponent as CaretLeft } from "../imgs/icons/caret-left.svg";
import { text_dark_accessory, text_dark_major } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  ${p_16_semibold}
  color: ${text_dark_major};
`;

const BackButton = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
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

const CrumbsWrapper = styled.ol`
  padding-left: 0;
  margin-left: 16px;
  display: flex;
`;

const CrumbLast = styled.li`
  color: ${text_dark_accessory};
  cursor: select;
`;

function noop() {}

function childrenToArray(children) {
  return React.Children.toArray(children);
}

function Breadcrumb({ children, routes, onBack = noop, separator = "/" }) {
  let crumbs;

  if (routes) {
  } else if (children) {
    crumbs = childrenToArray(children).map((child, index) => {
      if (!child) {
        return child;
      }

      const isLast = index === children.length - 1;

      let crumb;
      if (!isLast) {
        crumb = <Fragment key={index}>{child}</Fragment>;
      } else {
        crumb = React.cloneElement(child, {
          separator: isLast ? null : separator,
          disabled: isLast,
          key: index,
        });
      }

      return crumb;
    });
  }

  return (
    <Wrapper className="breadcrumb">
      <BackButton onClick={onBack}>
        <CaretLeft />
      </BackButton>

      <CrumbsWrapper>{crumbs}</CrumbsWrapper>
    </Wrapper>
  );
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
