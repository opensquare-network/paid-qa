import styled, { css } from "styled-components";
import { useState } from "react";

import MarkdownEditor from "../Editor/MarkdownEditor";
import Button from "../styled/Button";
import Preview from "../Preview";

const MarkdownWrapper = styled.div``;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
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

const ErrorMsg = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #EE4444;
`;

export default function RichEdit({
  content,
  setContent,
  onSubmit,
  showButtons = true,
  submitting = false,
  disabled = false,
  submitButtonName = "Post",
  errorMsg = "",
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <MarkdownWrapper>
        <MarkdownEditorWrapper preview={preview}>
          <MarkdownEditor
            content={content}
            setContent={setContent}
            disabled={submitting}
          />
        </MarkdownEditorWrapper>
        {preview && <Preview content={content} />}
      </MarkdownWrapper>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      {showButtons && (
        <ButtonsWrapper>
          <Button onClick={() => setPreview(!preview)}>
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button
            primary
            isLoading={submitting}
            disabled={disabled}
            onClick={() => {
              setPreview(false);
              onSubmit();
            }}
          >
            {submitButtonName}
          </Button>
        </ButtonsWrapper>
      )}
    </div>
  );
}
