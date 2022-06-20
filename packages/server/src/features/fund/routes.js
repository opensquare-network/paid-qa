const Router = require("koa-router");
const fundController = require("./fund.controller");

const router = new Router();

router.post("/funds", fundController.addFund);
// fixme: url looks not so perfect. How about /funds/summary or funds_summary?
router.get("/topics/:topicCid/fundsummary", fundController.getFundSummary);

module.exports = router;
