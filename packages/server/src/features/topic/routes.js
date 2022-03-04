const Router = require("koa-router");
const topicController = require("./topic.controller");

const router = new Router();

router.get("/topics/:cid", topicController.getTopic);
router.get("/topics", topicController.getTopics);
router.post("/topics", topicController.createTopic);

module.exports = router;