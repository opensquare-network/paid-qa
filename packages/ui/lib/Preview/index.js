import React from "react";
import MicromarkMd from "./MicromarkMd";
import styled, { css } from "styled-components";

const PreviewWrapper = styled.div`
  ${(p) =>
    p.bordered &&
    css`
      padding-left: 12px;
      border-left: 4px solid #e2e8f0;
    `}
  ${(p) =>
    p.minHeight &&
    css`
      min-height: ${p.minHeight}px;
    `}
`;

function Preview({ content, bordered = true, minHeight }) {
  return (
    <PreviewWrapper bordered={bordered} minHeight={minHeight}>
      <MicromarkMd md={content} />
    </PreviewWrapper>
  );
}

export default Preview;
