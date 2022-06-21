const Router = require("koa-router");
const fundController = require("./fund.controller");

const router = new Router();

router.post("/funds", fundController.addFund);
router.get("/topics/:topicCid/funds/summary", fundController.getFundSummary);

module.exports = router;
