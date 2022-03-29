import Tabs from "../Tabs";

export default function ProfileTabs({ value, setValue }) {
  const items = ["posts", "replies"];
  return <Tabs {...{ items, value, setValue }} />;
}
