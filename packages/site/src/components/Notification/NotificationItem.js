import FundItem from "./FundItem";
import ResolveItem from "./ResolveItem";
import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import DiscussionItem from "./DiscussionItem";

const Wrapper = styled(Card)`
  ${p_14_normal};
  color: #506176;

  a {
    &:hover {
      text-decoration: underline;
    }

    cursor: pointer;
  }
`;

export default function NotificationItem({ notification }) {
  let item = null;
  if (notification.type.includes("reply")) {
    item = <DiscussionItem notification={notification} type="Replied" />;
  }
  if (notification.type.includes("mention")) {
    item = <DiscussionItem notification={notification} type="Mentioned" />;
  }
  if (notification.type.includes("fund")) {
    item = <FundItem notification={notification} />;
  }
  if (notification.type.includes("support")) {
    item = <FundItem notification={notification} type="Supported" />;
  }
  if (notification.type.includes("topicResolved")) {
    item = <ResolveItem notification={notification} />;
  }
  return <Wrapper>{item}</Wrapper>;
}
