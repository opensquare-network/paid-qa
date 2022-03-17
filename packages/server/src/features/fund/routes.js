const Router = require("koa-router");
const fundController = require("./fund.controller");

const router = new Router();

router.post("/funds", fundController.addFund);

module.exports = router;
