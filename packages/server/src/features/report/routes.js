const Router = require("koa-router");
const reportController = require("./report.controller");

const router = new Router();

router.post("/report", reportController.report);

module.exports = router;
