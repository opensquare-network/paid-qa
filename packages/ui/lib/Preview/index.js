import MicromarkMd from "./MicromarkMd";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  padding-left: 12px;
  border-left: 4px solid #e2e8f0;
  min-height: 159px;
`;

function Preview({ content }) {
  return (
    <PreviewWrapper>
      <MicromarkMd md={content} />
    </PreviewWrapper>
  );
}

export default Preview;
