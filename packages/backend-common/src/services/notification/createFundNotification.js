const { Topic, Answer, Notification } = require("../../models");
const { toPublicKey } = require("../../utils/address");

async function createFundNotification(fund) {
  let topic, answer, fundTo;

  if (fund.refCidType === "topic") {
    topic = await Topic.findOne({ cid: fund.refCid });
    if (!topic) {
      return;
    }

    fundTo = topic?.signer;
  } else if (fund.refCidType === "answer") {
    answer = await Answer.findOne({ cid: fund.refCid });
    if (!answer) {
      return;
    }

    topic = await Topic.findOne({ cid: answer.topicCid });
    if (!topic) {
      return;
    }

    fundTo = answer?.signer;
  } else {
    return;
  }

  const owner = toPublicKey(fundTo);
  await Notification.create({
    owner,
    type: ["fund"],
    data: {
      topic: topic?._id,
      answer: answer?._id,
      fund: fund?._id,
      byWho: {
        address: fund.sponsor,
        network: fund.network,
      },
    },
  });
}

module.exports = {
  createFundNotification,
};
