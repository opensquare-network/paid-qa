const Router = require("koa-router");
const answerController = require("./answer.controller");

const router = new Router();

router.get("/topics/:topicCid/answers", answerController.getAnswers);
router.post("/topics/:topicCid/answers", answerController.postAnswer);

module.exports = router;
