import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useRef } from "react";

import HeaderIcon from "../imgs/icons/markdown/header.svg";
import BoldIcon from "../imgs/icons/markdown/bold.svg";
import ItalicIcon from "../imgs/icons/markdown/italic.svg";
import QuoteIcon from "../imgs/icons/markdown/quote.svg";
import OrderedListIcon from "../imgs/icons/markdown/ordered-list.svg";
import UnorderedListIcon from "../imgs/icons/markdown/unordered-list.svg";
import LinkIcon from "../imgs/icons/markdown/link.svg";
import ImageIcon from "../imgs/icons/markdown/image.svg";
import CodeIcon from "../imgs/icons/markdown/code.svg";

const iconMap = {
  header: HeaderIcon,
  bold: BoldIcon,
  italic: ItalicIcon,
  quote: QuoteIcon,
  "ordered-list": OrderedListIcon,
  "unordered-list": UnorderedListIcon,
  link: LinkIcon,
  image: ImageIcon,
  code: CodeIcon,
};

const p_14_normal = css`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
`;

const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  .react-mde {
    border-top-color: #e2e8f0;
    border-bottom: none;
    border-left: none;
    border-right: none;
    textarea {
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0 !important;
      :hover,
      :focus,
      :active {
        border-color: #b7c0cc !important;
      }
      ${p_14_normal};
      outline: none;
      font-family: inherit;
      background-color: #fbfcfe;
      ::placeholder {
        color: #9da9bb;
      }
      ${no_scroll_bar};
    }
    .mde-header {
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      border-bottom: none;
      .mde-tabs {
        display: none;
      }
      .mde-header-group {
        padding: 8px 16px;
        .mde-header-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin: 0;
          :not(:first-child) {
            margin-left: 8px;
          }
        }
      }
    }
  }
  .mde-text {
    min-height: 60px;
  }
`;

export default function MarkdownEditor({
  content,
  setContent,
  disabled = false,
  loadSuggestions,
}) {
  const ref = useRef();
  const resetTextareaHeight = () => {
    const textarea = ref?.current?.finalRefs?.textarea?.current;
    if (textarea) {
      textarea.style.height = "116px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (content === "") {
      resetTextareaHeight();
    }
  }, [content]);

  return (
    <Wrapper>
      <ReactMde
        ref={ref}
        value={content}
        onChange={(content) => {
          resetTextareaHeight();
          !disabled && setContent(content);
        }}
        toolbarCommands={[
          [
            "header",
            "bold",
            "italic",
            "quote",
            "ordered-list",
            "unordered-list",
            "link",
            "image",
            "code",
          ],
        ]}
        getIcon={(commandName) => {
          return <img src={iconMap[commandName]} alt="" />;
        }}
        loadSuggestions={loadSuggestions}
        childProps={{
          textArea: {
            placeholder: "Please text here...",
          },
        }}
        initialEditorHeight={116}
      />
    </Wrapper>
  );
}
