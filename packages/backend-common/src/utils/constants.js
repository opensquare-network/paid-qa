const OnChainStatus = Object.freeze({
  Reserved: "reserved",
  Published: "published",
});

const NotificationType = Object.freeze({
  Reply: "reply",
  Mention: "mention",
  Support: "support",
  Fund: "fund",
  TopicResolved: "topicResolved",
});

module.exports = {
  OnChainStatus,
  NotificationType,
};
