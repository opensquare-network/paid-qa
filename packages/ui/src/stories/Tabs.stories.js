import React from "react";
import Tabs from "../../lib/Tabs";

export default {
  title: "Tabs",
};

const items = [
  { value: "promises", suffix: 1 },
  { value: "funds", suffix: 3 },
  { value: "rewards", suffix: 2 },
  { value: "topics", suffix: 9 },
  { value: "replies", suffix: 7 },
];

export const basic = () => <Tabs items={items} />;
