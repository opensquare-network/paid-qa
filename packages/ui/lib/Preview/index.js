import React from "react";
import MicromarkMd from "./MicromarkMd";
import styled, { css } from "styled-components";

const PreviewWrapper = styled.div`
  padding-left: 12px;
  ${(p) =>
    p.bordered &&
    css`
      border-left: 4px solid #e2e8f0;
    `}
  min-height: 159px;
`;

function Preview({ content, bordered = true }) {
  return (
    <PreviewWrapper bordered={bordered}>
      <MicromarkMd md={content} />
    </PreviewWrapper>
  );
}

export default Preview;
