// not ready for public
import React from "react";
import styled, { css } from "styled-components";
import { p_14_normal } from "../styles/textStyles";
import { netural_grey_200 } from "../styles/colors";
import { MOBILE_SIZE } from "@osn/consts";

const CardWrapper = styled.div`
  ${p_14_normal};
  padding: 32px;
  background-color: #fff;
  border: 1px solid ${netural_grey_200};

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

const Divider = styled.div`
  height: 1px;
  background-color: ${netural_grey_200};
  margin: 16px 0;
`;

function Card(props) {
  const { children, head, size, shadow = true, ...restProps } = props;

  return (
    <CardWrapper {...restProps} size={size} shadow={shadow} className="card">
      {head}
      {head && children && <Divider />}
      {children}
    </CardWrapper>
  );
}

export default Card;
