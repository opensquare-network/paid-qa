const { Reward, Answer, Fund, Fulfill } = require("../../models");

async function updatePromiseFulfillment(topicCid, sponsorPublicKey) {
  const topicPromise = await Reward.aggregate([
    {
      $match: {
        topicCid,
        sponsorPublicKey,
      },
    },
    {
      $group: {
        _id: "$bounty.symbol",
        promiseAmount: { $sum: "$bounty.value" },
      },
    },
  ]);

  const answers = await Answer.find({ topicCid }).select("cid");
  const refCids = [topicCid, ...answers.map((answer) => answer.cid)];

  // Calculate funds
  for (const { _id: symbol, promiseAmount } of topicPromise) {
    const funds = await Fund.aggregate([
      {
        $match: {
          refCid: { $in: refCids },
          sponsorPublicKey,
          "bounty.symbol": symbol,
        },
      },
      {
        $group: {
          _id: null,
          fundAmount: { $sum: "$bounty.value" },
        },
      },
    ]);

    const fundAmount = funds[0]?.fundAmount || 0;

    await Fulfill.updateOne(
      {
        topicCid,
        sponsorPublicKey,
        symbol,
      },
      {
        promised: promiseAmount,
        funded: fundAmount,
        fulfilled: Number(promiseAmount) <= Number(fundAmount),
      },
      { upsert: true }
    );
  }
}

module.exports = updatePromiseFulfillment;
