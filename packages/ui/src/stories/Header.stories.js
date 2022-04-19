import Header from "../../lib/Header";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Header",
  component: Header,
};

export const primary = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);
export const content = () => {
  const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;

  return (
    <BrowserRouter>
      <Header>
        <Content>
          <div>left content</div>
          <div>right content</div>
        </Content>
      </Header>
    </BrowserRouter>
  );
};
