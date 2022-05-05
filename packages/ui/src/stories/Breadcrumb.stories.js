import Breadcrumb from "../../lib/Breadcrumb";

export default {
  title: "Breadcrumb",
  component: Breadcrumb,
};

export const primary = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Page</Breadcrumb.Item>
      <Breadcrumb.Item>Topic</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export const backButtonRender = () => {
  const backButtonRender = (button) => {
    return <a href="/">{button}</a>;
  };

  return (
    <Breadcrumb backButtonRender={backButtonRender}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Page</Breadcrumb.Item>
      <Breadcrumb.Item>Topic</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export const separator = () => {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Page</Breadcrumb.Item>
      <Breadcrumb.Item>Topic</Breadcrumb.Item>
    </Breadcrumb>
  );
};
