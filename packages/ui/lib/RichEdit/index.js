import React from "react";
import styled from "styled-components";

import Button from "../styled/Button";

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
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
    submitButtonProps = {},
    // @deprecated use `submitButtonText` instead
    submitButtonName = "Post",
    submitButtonText = submitButtonName,
    submitting = false,
    disabled = false,
    errorMsg = "",
    loadSuggestions = () => [],
  },
  ref
) {
  return (
    <div className="rich-editor" ref={ref}>
      <RichTextEditor
        disabled={disabled}
        value={content}
        onChange={setContent}
        loadSuggestions={loadSuggestions}
      />

      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

      {showButtons && (
        <ButtonsWrapper>
          {showSubmitButton && (
            <Button
              className="button-submit"
              {...submitButtonProps}
              primary
              isLoading={submitting}
              disabled={disabled}
              onClick={() => {
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
