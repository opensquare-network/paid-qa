import { useState } from "react";
import styled from "styled-components";
import Select from "../../lib/Select";
import { Dropdown } from "semantic-ui-react";

export default {
  title: "Select",
  component: Select,
};

export const primary = () => {
  const [value, setValue] = useState("1");

  const options = [
    {
      content: "Option 1",
      value: "1",
    },
    {
      content: "Option 2",
      value: "2",
    },
    {
      content: "Option 3",
      value: "3",
    },
  ];

  return <Select value={value} options={options} onSelect={setValue} />;
};
export const content = () => {
  const Option = styled.div`
    padding: 10px 0;
    height: 64px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

  const [value, setValue] = useState();

  const optionRender = (option = {}) => {
    return (
      <Option>
        <div>{option.name}</div>
        <div>{option.age}</div>
      </Option>
    );
  };

  const options = [
    {
      name: "Jucy",
      age: "23",
      value: "1",
    },
    {
      name: "Taylor",
      age: "34",
      value: "2",
    },
    {
      name: "Amy",
      age: "21",
      value: "3",
    },
  ];

  return (
    <Select
      value={value}
      options={options}
      onSelect={setValue}
      optionRender={optionRender}
    />
  );
};
export const semantic = () => {
  const [value, setValue] = useState("1");

  const options = [
    {
      text: "Option 1",
      value: "1",
    },
    {
      content: "Option 2",
      value: "2",
    },
    {
      content: "Option 3",
      value: "3",
    },
  ];

  return <Dropdown selection fluid options={options} />;
};
