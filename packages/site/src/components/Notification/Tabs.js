import Tabs from "@osn/common-ui/lib/Tabs";

export default function NotificationTabs({ value, setValue }) {
  const items = [
    { value: "notifications" },
    { value: "discussions" },
    { value: "rewards" },
  ];
  return <Tabs {...{ items, value, setValue }} />;
}
