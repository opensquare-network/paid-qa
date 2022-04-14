import React from "react";

import Button from "../../lib/styled/Button";

export default {
  title: "Button",
  component: Button,
};
export const Primary = () => <Button primary>click me</Button>;
export const loadingOrDisabled = () => (
  <Button isLoading disabled>
    click me
  </Button>
);
