const { Topic } = require("../../models");
const { bnAdd } = require("../../utils/bn");

function accumulateSymbolFunds(stats, fund) {
  const { bounty: { symbol, value } } = fund;
  stats[symbol] = bnAdd(stats[symbol] || 0, value);
}

function accumulateSponsorFunds(stats, fund) {
  stats[fund.sponsor] = stats[fund.sponsor] || {};
  accumulateSymbolFunds(stats[fund.sponsor], fund);
}

function sumUpFunds(funds) {
  const result = {};
  funds?.forEach((fund) => {
    accumulateSymbolFunds(result, fund);
  });
  return result;
}

async function getFundSummary(topicCid) {
  const topic = await Topic.findOne({ cid: topicCid })
    .populate("funds")
    .populate({
      path: "answers",
      options: { sort: { createdAt: 1 } },
      populate: "funds",
    });

  const statsByAnswers = {};
  if (topic.funds?.length > 0) {
    statsByAnswers[0] = sumUpFunds(topic.funds);
  }
  topic.answers.forEach((answer, index) => {
    if (answer.funds?.length > 0) {
      statsByAnswers[index + 1] = sumUpFunds(answer.funds);
    }
  });

  const statsBySponsors = {};
  topic.funds?.forEach((fund) => accumulateSponsorFunds(statsBySponsors, fund));
  topic.answers?.forEach((answer) => {
    answer.funds?.forEach((fund) =>
      accumulateSponsorFunds(statsBySponsors, fund)
    );
  });

  return {
    statsByAnswers,
    statsBySponsors,
  };
}

module.exports = getFundSummary;
