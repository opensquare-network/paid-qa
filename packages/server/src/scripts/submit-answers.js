const dotenv = require("dotenv");
dotenv.config();

const {
  encoder: { InteractionEncoder },
  interactions: {
    AnswerInteraction,
  }
} = require("@paid-qa/spec");
const { Answer } = require("../models");
const { PostStatus } = require("../utils/constants");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function submitAnswer(answer) {
  const interaction = new AnswerInteraction(answer.cid);
  const remark = new InteractionEncoder(interaction).getRemark();
  const hexRemark = "0x" + Buffer.from(remark).toString("hex");

  const topic = await Topic.findOne({ cid: answer.topicCid });
  const network = topic.network;

  //TODO: sign and send answer to network

  await Answer.updateOne({ _id: answer._id }, { status: PostStatus.Published });
}

async function startSubmitAnswers() {
  const answers = await Answer.find({ status: PostStatus.Reserved });
  for (const answer of answers) {
    try {
      await submitAnswer(answer);
    } catch (e) {
      console.error(e);
    }
  }
}

async function main() {
  while (true) {
    try {
      await startSubmitAnswers();
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
