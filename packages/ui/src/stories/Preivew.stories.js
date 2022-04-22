import styled from "styled-components";
import { useState } from "react";
import Preview from "../../lib/Preview";

export default {
  title: "Preview",
  component: Preview,
  parameters: {
    docs: {
      description: {
        component: "Please visit the `Rich Editor` for better experience.",
      },
    },
  },
};

const markdown = `
# heading 1

## heading 2

### heading 3

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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 400px;
  margin-right: 48px;
`;

export const primary = () => {
  const [content, setContent] = useState(markdown);

  return (
    <Wrapper>
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></Textarea>

      <Preview content={content} />
    </Wrapper>
  );
};
export const toggleBorder = () => {
  const [bordered, setBordered] = useState(true);

  return (
    <>
      <button
        style={{ marginBottom: 20 }}
        onClick={() => setBordered(!bordered)}
      >
        {bordered ? "hide" : "show"} border
      </button>

      <Preview content={markdown} bordered={bordered} />
    </>
  );
};
