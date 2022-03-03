const Router = require("koa-router");
const accountController = require("./account.controller");

const router = new Router();

router.get("/account/:address/topics", accountController.getAccountTopics);

module.exports = router;
