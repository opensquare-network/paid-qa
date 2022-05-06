import React, { cloneElement } from "react";
import styled from "styled-components";
import BreadcrumbItem from "./BreadcrumbItem";
import { ReactComponent as CaretLeft } from "../imgs/icons/caret-left.svg";
import { text_dark_major } from "../styles/colors";
import { p_16_semibold } from "../styles/textStyles";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  ${p_16_semibold}
  color: ${text_dark_major};
`;

const BackButton = styled.span`
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

function noop() {}

function defaultBackButtonRender(button) {
  return button;
}

function defaultItemRender(route, _routes, isLast) {
  return isLast ? (
    <span>{route.name}</span>
  ) : (
    <a href={`#/${getRouteLink(route.link)}`}>{route.name}</a>
  );
}

function getRouteLink(link) {
  link = link.replace(/^\//, "");
  return link;
}

/**
 * @param {import('./types').BreadcrumbProps} props
 */
function Breadcrumb(props) {
  const {
    children,
    routes,
    showBackButton = true,
    backButtonRender = defaultBackButtonRender,
    onBack = noop,
    separator = "/",
    itemRender = defaultItemRender,
    ...rest
  } = props;

  let crumbs;
  if (routes && routes.length > 0) {
    crumbs = routes.map((route) => {
      const isLast = routes.indexOf(route) === routes.length - 1;

      return (
        <BreadcrumbItem
          key={route.link}
          disabled={isLast}
          separator={separator}
        >
          {itemRender(route, routes, isLast)}
        </BreadcrumbItem>
      );
    });
  } else if (children) {
    crumbs = React.Children.toArray(children).map(
      (element, index, elements) => {
        if (!element) {
          return element;
        }

        const isLast = index === elements.length - 1;

        const crumb = cloneElement(element, {
          separator,
          disabled: isLast,
          key: index,
        });

        return crumb;
      }
    );
  }

  return (
    <Wrapper {...rest} className="breadcrumb">
      {showBackButton &&
        backButtonRender(
          <BackButton onClick={onBack}>
            <CaretLeft />
          </BackButton>
        )}

      <CrumbsWrapper>{crumbs}</CrumbsWrapper>
    </Wrapper>
  );
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
