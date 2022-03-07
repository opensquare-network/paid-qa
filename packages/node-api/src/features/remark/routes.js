const Router = require("koa-router");
const remarkController = require("./remark.controller");

const router = new Router();

router.get("/remark/:blockHash/:extrinsicHash", remarkController.getRemark);

module.exports = router;
