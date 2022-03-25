import ReplyItem from "./ReplyItem";
import MentionItem from "./MentionItem";
import FundItem from "./FundItem";

export default function NotificationItem({ notification }) {
  if (notification.type.includes("reply")) {
    return <ReplyItem notification={notification} />;
  }
  if (notification.type.includes("mention")) {
    return <MentionItem notification={notification} />;
  }
  if (notification.type.includes("fund")) {
    return <FundItem notification={notification} />;
  }
  return <></>;
}
