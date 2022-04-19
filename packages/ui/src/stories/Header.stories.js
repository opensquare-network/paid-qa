import Header from "../../lib/Header";
import styled from "styled-components";

export default {
  title: "Header",
  component: Header,
};

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const primary = () => <Header />;
export const content = () => (
  <Header>
    <Content>
      <div>left content</div>
      <div>right content</div>
    </Content>
  </Header>
);
export const wrapLogo = () => {
  const WrapLogoComponent = ({ children }) => (
    <div onClick={() => alert("hello")}>{children}</div>
  );

  return (
    <Header WrapLogoComponent={WrapLogoComponent}>
      click the logo get an alert
    </Header>
  );
};
