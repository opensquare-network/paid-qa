import ReplyItem from "./ReplyItem";
import MentionItem from "./MentionItem";
import FundItem from "./FundItem";
import SupportItem from "./SupportItem";
import ResolveItem from "./ResolveItem";

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
  if (notification.type.includes("support")) {
    return <SupportItem notification={notification} />;
  }
  if (notification.type.includes("topicResolved")) {
    return <ResolveItem notification={notification} />;
  }
  return <></>;
}
