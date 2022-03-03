const Router = require("koa-router");
const answerController = require("./answer.controller");

const router = new Router();

router.get("/topics/:topicCid/answers", answerController.getAnswers);

module.exports = router;
