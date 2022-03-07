const Router = require("koa-router");
const tokenInfoController = require("./tokeninfo.controller");

const router = new Router();

router.get("/tokeninfo/native", tokenInfoController.getNativeTokenInfo);
router.get(
  "/tokeninfo/asset/:assetId/:blockHash",
  tokenInfoController.getAssetTokenInfo
);

module.exports = router;
