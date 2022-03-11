const RewardCurrencyType = Object.freeze({
  Native: "native",
  Asset: "asset",
});

const PostStatus = Object.freeze({
  Reserved: "reserved",
  Published: "published",
  Active: "active",
  Resolved: "resolved",
});

module.exports = {
  RewardCurrencyType,
  PostStatus,
};
