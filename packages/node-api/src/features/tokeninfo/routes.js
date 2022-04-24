const Router = require("koa-router");
const tokenInfoController = require("./tokeninfo.controller");

const router = new Router();

router.get("/token/native/info", tokenInfoController.getNativeTokenInfo);
router.get("/token/:assetId/info", tokenInfoController.getAssetTokenInfo);
router.get(
  "/token/:assetId/:blockHash/info",
  tokenInfoController.getAssetTokenInfo
);

module.exports = router;
