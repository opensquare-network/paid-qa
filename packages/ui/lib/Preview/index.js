import React from "react";
import MicromarkMd from "./MicromarkMd";
import styled, { css } from "styled-components";

const PreviewWrapper = styled.div`
  padding-left: 12px;
  ${(p) =>
    p.border &&
    css`
      border-left: 4px solid #e2e8f0;
    `}
  min-height: 159px;
`;

function Preview({ content, border = true }) {
  return (
    <PreviewWrapper border={border}>
      <MicromarkMd md={content} />
    </PreviewWrapper>
  );
}

export default Preview;
