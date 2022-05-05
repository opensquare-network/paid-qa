import { useState } from "react";
import RichEditor from "../../lib/RichEdit";

export default {
  name: "RichEditor",
  component: RichEditor,
  parameters: {
    docs: {
      description: {
        component:
          "requires import 'react-mde/lib/styles/css/react-mde-all.css'",
      },
    },
  },
};

const markdown = `
# heading 1

## heading 2

**bold text**

_italic text_

- bullet 1
- bullet 2

1. numbered 1
2. numbered 2

|table|example|index|
|-|-|-|
|table|column|1|
|table|column|2|

\`\`\`bash
echo "hello"
\`\`\`

\`inline code\`

> quote text
`.trim();

export const primary = () => {
  const [content, setContent] = useState(markdown);
  return <RichEditor content={content} setContent={setContent} />;
};

export const submitting = () => {
  const [content, setContent] = useState("submitting");
  return <RichEditor submitting content={content} setContent={setContent} />;
};

export const disabled = () => {
  const [content, setContent] = useState("disabled");
  return <RichEditor disabled content={content} setContent={setContent} />;
};

export const submitButtonName = () => {
  const [content, setContent] = useState(
    "change the submit button name to `Submit`"
  );
  return (
    <RichEditor
      submitButtonName="Submit"
      content={content}
      setContent={setContent}
    />
  );
};

export const errorMsg = () => {
  const [content, setContent] = useState("error message");
  return (
    <RichEditor
      errorMsg="error message"
      content={content}
      setContent={setContent}
    />
  );
};

export const onSubmit = () => {
  const [content, setContent] = useState(
    "click the Post button to get an alert"
  );
  return (
    <RichEditor
      onSubmit={() => alert(`onSubmit: ${content}`)}
      content={content}
      setContent={setContent}
    />
  );
};

export const hideButtons = () => {
  const [content, setContent] = useState("hide buttons");
  return (
    <RichEditor showButtons={false} content={content} setContent={setContent} />
  );
};

export const hideOkButton = () => {
  const [content, setContent] = useState("hide ok button");
  return (
    <RichEditor
      content={content}
      showOkButton={false}
      setContent={setContent}
    />
  );
};

export const hidePreviewButton = () => {
  const [content, setContent] = useState("hide preview button");
  return (
    <RichEditor
      content={content}
      showPreviewButton={false}
      setContent={setContent}
    />
  );
};

export const previewButtonBlock = () => {
  const [content, setContent] = useState("hide preview button");
  return (
    <RichEditor
      content={content}
      previewButtonProps={{
        block: true,
      }}
      showOkButton={false}
      setContent={setContent}
    />
  );
};

export const loadSuggestions = () => {
  const [content, setContent] = useState(
    "type `@` to get suggestions here 👇\n\n"
  );
  const loadSuggestions = () => {
    return [
      {
        preview: "polkadot",
        value: "polkadot",
      },
      {
        preview: "opensquare network",
        value: "opensquare network",
      },
    ];
  };

  return (
    <RichEditor
      loadSuggestions={loadSuggestions}
      content={content}
      setContent={setContent}
    />
  );
};
