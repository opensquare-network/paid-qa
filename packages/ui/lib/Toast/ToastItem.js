import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  primary_purple_500,
  secondary_red_500,
  text_dark_minor,
} from "../styles/colors";
import { p_16_semibold, p_14_normal } from "../styles/textStyles";
import { ReactComponent as PendingIcon } from "../imgs/icons/pending.svg";
import { ReactComponent as CloseIcon } from "../imgs/icons/close.svg";

const borderColors = {
  success: "#4CAF50",
  info: primary_purple_500,
  pending: primary_purple_500,
  error: secondary_red_500,
};

const ToastItemWrapper = styled.div`
  border-left: 4px solid #9da9bb;
  padding: 20px;
  width: 400px;
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 31px rgba(26, 33, 44, 0.06))
    drop-shadow(0px 0.751293px 8px rgba(26, 33, 44, 0.04));
  /* TODO: use color from colors.js */
  color: rgba(17, 17, 17, 0.65);
  display: flex;

  transform: translateX(100%);
  transition: transform 0.25s ease-out;

  ${(p) =>
    p.slideIn &&
    css`
      transform: translateX(0);
    `}
  /* reversed */
  :not(:last-child) {
    margin-top: 20px;
  }

  ${(p) =>
    p.type &&
    css`
      border-left-color: ${borderColors[p.type]};
    `}
`;
const ToastItemContent = styled.div`
  flex: 1;
`;
const ToastTitle = styled.div`
  ${p_16_semibold};
  margin-bottom: 4px;
`;
const ToastMessage = styled.p`
  ${p_14_normal};
  color: ${text_dark_minor};
  word-wrap: break-word;
  word-break: break-all;
`;
const ToastItemExtra = styled.div``;
const CloseIconWrapper = styled.div`

  svg {
    cursor: pointer;
    path {
      fill: #9da9bb;
    }
    fill: #9da9bb;
    :hover {
      fill: #2e343d;
      path {
        fill: #2e343d;
      }
    }
    `;

/**
 * @param {import('./types').ToastItemProps} props
 */
function ToastItem(props = {}) {
  const { title, message, type, onClose = () => {} } = props;
  const [slideIn, setSlideIn] = useState(false);

  setTimeout(() => setSlideIn(true), 1);

  return (
    <ToastItemWrapper type={type} slideIn={slideIn}>
      <ToastItemContent>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
      </ToastItemContent>

      <ToastItemExtra>
        {type === "pending" ? (
          <PendingIcon />
        ) : (
          <CloseIconWrapper>
            <CloseIcon onClick={onClose} />
          </CloseIconWrapper>
        )}
      </ToastItemExtra>
    </ToastItemWrapper>
  );
}

export default ToastItem;
