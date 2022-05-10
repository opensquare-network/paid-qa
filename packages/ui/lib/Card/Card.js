import React from "react";
import styled, { css } from "styled-components";
import { p_14_medium, p_14_normal, p_16_semibold } from "../styles/textStyles";
import { netural_grey_200 } from "../styles/colors";
import { MOBILE_SIZE } from "@osn/consts";
import FlexBetween from "../styled/FlexBetween";

const CardWrapper = styled.div`
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

function Card(props) {
  const {
    children,
    title,
    extra,
    head: customizeHead,
    size,
    shadow = true,
    bordered = true,
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
      className="card"
    >
      {head}
      {head && children && <Divider />}
      {children}
    </CardWrapper>
  );
}

export default Card;
