const RewardCurrencyType = Object.freeze({
  Native: "native",
  Asset: "asset",
});

const PostStatus = Object.freeze({
  Reserved: "reserved",
  Published: "published",
  Onchain: "onchain",
  Closed: "closed",
});

module.exports = {
  RewardCurrencyType,
  PostStatus,
};
