import styled from "styled-components";
import { useState } from "react";
import Preview from "../../lib/Preview";

export default {
  title: "Preview",
  component: Preview,
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
`.trim();

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 300px;
  margin-right: 48px;
`;

export const primary = () => {
  const [content, setContent] = useState(markdown);

  return (
    <Wrapper>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>

      <Preview content={content} />
    </Wrapper>
  );
};
