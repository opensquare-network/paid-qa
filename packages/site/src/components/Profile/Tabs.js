import Tabs from "../Tabs";

export default function ProfileTabs({ value, setValue }) {
  const items = ["questions", "answers", "activity", "analytics"];
  return <Tabs {...{ items, value, setValue }} />;
}
