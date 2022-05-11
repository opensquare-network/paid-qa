import React from "react";
import MicromarkMd from "./MicromarkMd";
import styled, { css } from "styled-components";
import sanitizeHtml from "sanitize-html";

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

function Preview({
  content,
  bordered = true,
  allowTags = sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "br"]),
  minHeight,
}) {
  return (
    <PreviewWrapper bordered={bordered} minHeight={minHeight}>
      <MicromarkMd md={content} allowTags={allowTags} />
    </PreviewWrapper>
  );
}

export default Preview;
