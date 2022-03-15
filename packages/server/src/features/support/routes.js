const Router = require("koa-router");
const supportController = require("./support.controller");

const router = new Router();

router.post("/topics/:topicCid/supports", supportController.addSupport);

module.exports = router;
