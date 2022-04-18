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
`;

export const primary = () => <Preview content={markdown} />;
