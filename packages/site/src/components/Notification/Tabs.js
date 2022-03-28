import Tabs from "../Tabs";

export default function NotificationTabs({ value, setValue }) {
  const items = ["notifications", "discussions", "rewards"];
  return <Tabs {...{ items, value, setValue }} />;
}
