import React from "react";
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
  color: #ee4444;
`;

function RichEdit(
  {
    content,
    setContent,
    onSubmit = () => {},
    showButtons = true,
    showSubmitButton = true,
    showPreviewButton = true,
    submitButtonProps = {},
    previewButtonProps = {},
    // @deprecated use `submitButtonText` instead
    submitButtonName = "Post",
    submitButtonText = submitButtonName,
    submitting = false,
    disabled = false,
    errorMsg = "",
    loadSuggestions,
  },
  ref
) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="rich-editor">
      <MarkdownWrapper>
        <MarkdownEditorWrapper preview={preview} ref={ref}>
          <MarkdownEditor
            content={content}
            setContent={setContent}
            disabled={submitting}
            loadSuggestions={loadSuggestions}
          />
        </MarkdownEditorWrapper>
        {preview && <Preview minHeight={159} content={content} />}
      </MarkdownWrapper>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      {showButtons && (
        <ButtonsWrapper>
          {showPreviewButton && (
            <Button
              {...previewButtonProps}
              className="button-preview"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </Button>
          )}
          {showSubmitButton && (
            <Button
              className="button-submit"
              {...submitButtonProps}
              primary
              isLoading={submitting}
              disabled={disabled}
              onClick={() => {
                setPreview(false);
                onSubmit();
              }}
            >
              {submitButtonText || submitButtonName}
            </Button>
          )}
        </ButtonsWrapper>
      )}
    </div>
  );
}

export default React.forwardRef(RichEdit);
