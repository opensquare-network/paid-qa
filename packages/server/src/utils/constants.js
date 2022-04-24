const PostStatus = Object.freeze({
  Reserved: "reserved",
  Published: "published",
  Active: "active",
  Resolved: "resolved",
});

const NotificationType = Object.freeze({
  Reply: "reply",
  Mention: "mention",
  Support: "support",
  Fund: "fund",
  TopicResolved: "topicResolved",
});

module.exports = {
  PostStatus,
  NotificationType,
};
