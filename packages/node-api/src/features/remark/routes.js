const Router = require("koa-router");
const remarkController = require("./remark.controller");

const router = new Router();

router.get("/remark/:blockHash/:extrinsicIndex", remarkController.getRemark);
router.post("/remark/batchsend", remarkController.batchSendRemarks);

module.exports = router;
