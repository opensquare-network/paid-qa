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
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  );
};
