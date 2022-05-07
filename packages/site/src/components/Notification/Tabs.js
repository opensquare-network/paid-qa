import Tabs from "@osn/common-ui/lib/Tabs";

export default function NotificationTabs({ value, setValue }) {
  const items = [{ value: "notifications" }];
  return <Tabs {...{ items, value, setValue }} />;
}
