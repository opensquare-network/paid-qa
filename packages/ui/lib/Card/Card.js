import React, { cloneElement } from "react";
import styled, { css } from "styled-components";
import { p_14_medium, p_14_normal, p_16_semibold } from "../styles/textStyles";
import { netural_grey_200 } from "../styles/colors";
import { MOBILE_SIZE } from "@osn/constants";
import Flex from "../styled/Flex";
import FlexBetween from "../styled/FlexBetween";

const CardWrapper = styled(Flex)`
  ${p_14_normal};
  padding: 32px;
  background-color: #fff;

  ${(p) =>
    p.bordered &&
    css`
      border: 1px solid ${netural_grey_200};
    `}

  ${(p) =>
    p.size === "small" &&
    css`
      padding: 24px;
    `}

  ${(p) =>
    p.shadow &&
    css`
      box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
        0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
    `}

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding: 16px;
  }

  .osn-card-prefix {
    margin-right: 32px;

    ${(p) =>
      p.size === "small" &&
      css`
        margin-right: 24px;
      `}

    .osn-card-suffix {
      margin-left: 32px;

      ${(p) =>
        p.size === "small" &&
        css`
          margin-left: 24px;
        `}
    }
  }
`;

const CardBody = styled.div`
  flex: 1;
  max-width: 100%;
`;

const HeadTitle = styled.p`
  margin: 0;
  ${p_16_semibold}

  ${(p) =>
    p.size === "small" &&
    css`
      ${p_14_medium}
    `}
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${netural_grey_200};
  margin: 16px 0;
`;

/**
 * @param {import('./types').CardProps} props
 */
function Card(props) {
  const {
    children,
    title,
    extra,
    head: customizeHead,
    size,
    shadow = true,
    bordered = true,
    prefix,
    suffix,
    ...restProps
  } = props;

  const head =
    customizeHead ||
    ((title ?? extra) && (
      <FlexBetween>
        <HeadTitle size={size} className="head-title">
          {title}
        </HeadTitle>
        <div className="head-extra">{extra}</div>
      </FlexBetween>
    ));

  return (
    <CardWrapper
      {...restProps}
      size={size}
      shadow={shadow}
      bordered={bordered}
      className="osn-card"
    >
      {prefix &&
        cloneElement(prefix, {
          className: "osn-card-prefix",
        })}
      <CardBody className="osn-card-body">
        {head}
        {head && children && <Divider />}
        {children}
      </CardBody>
      {suffix &&
        cloneElement(suffix, {
          className: "osn-card-suffix",
        })}
    </CardWrapper>
  );
}

export default Card;
