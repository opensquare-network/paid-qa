import Tabs from "../Tabs";

export default function ProfileTabs({ value, setValue }) {
  const items = ["posts", "replies", "analytics"];
  return <Tabs {...{ items, value, setValue }} />;
}
