const { Answer } = require("@paid-qa/backend-common/src/models");

async function getAnswers(topicCid, page, pageSize) {
  const q = { topicCid };
  const total = await Answer.countDocuments(q);
  const answers = await Answer.find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("funds");

  return {
    items: answers,
    page,
    pageSize,
    total,
  };
}

module.exports = getAnswers;
