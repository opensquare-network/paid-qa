import styled, { css } from "styled-components";
import { useState } from "react";

import MarkdownEditor from "../Editor/MarkdownEditor";
import Button from "../styled/Button";
import MicromarkMd from "../Preview/MicromarkMd";

const MarkdownWrapper = styled.div``;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

const PreviewWrapper = styled.div`
  padding-left: 12px;
  border-left: 4px solid #e2e8f0;
  min-height: 159px;
`;

const MarkdownEditorWrapper = styled.div`
  ${(p) =>
    p.preview &&
    css`
      height: 0;
      opacity: 0;
      pointer-events: none;
    `}
`;

export default function RichEdit({
  content,
  setContent,
  onSubmit,
  showButtons = true,
  submitButtonName = "Post",
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <MarkdownWrapper>
        <MarkdownEditorWrapper preview={preview}>
          <MarkdownEditor content={content} setContent={setContent} />
        </MarkdownEditorWrapper>
        {preview && (
          <PreviewWrapper>
            <MicromarkMd md={content} />
          </PreviewWrapper>
        )}
      </MarkdownWrapper>
      {showButtons && (
        <ButtonsWrapper>
          <Button onClick={() => setPreview(!preview)}>
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button primary onClick={() => onSubmit(() => setPreview(false))}>
            {submitButtonName}
          </Button>
        </ButtonsWrapper>
      )}
    </div>
  );
}
