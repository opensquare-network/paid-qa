const Router = require("koa-router");
const resolveController = require("./resolve.controller");

const router = new Router();

router.post("/resolve", resolveController.resolve);

module.exports = router;
