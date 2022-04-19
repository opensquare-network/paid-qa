import { useState } from "react";
import DropdownSelector from "../../lib/DropdownSelector";

export default {
  title: "DropdownSelector",
  component: DropdownSelector,
  parameters: {
    docs: {
      description: {
        component: "requires semantic-ui-css",
      },
    },
  },
};

const options = [
  {
    id: 1,
    content: "Option 1",
    value: "option-1",
  },
  {
    id: 2,
    content: "Option 2",
    value: "option-2",
  },
  {
    id: 3,
    content: "Option 3",
    value: "option-3",
  },
];

export const primary = () => {
  const [value, setValue] = useState("option-2");

  return (
    <DropdownSelector options={options} value={value} onSelect={setValue} />
  );
};
