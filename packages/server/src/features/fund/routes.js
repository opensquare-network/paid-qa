const Router = require("koa-router");
const fundController = require("./fund.controller");

const router = new Router();

router.post("/topics/:topicCid/fund", fundController.fundTopic);
router.post(
  "/topics/:topicCid/answers/:answerCid/fund",
  fundController.fundAnswer
);

module.exports = router;
