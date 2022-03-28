const Router = require("koa-router");
const accountController = require("./account.controller");

const router = new Router();

router.get(
  "/network/:network/address/:address/topics",
  accountController.getAccountTopics
);

router.get(
  "/network/:network/address/:address/answers",
  accountController.getAccountAnswers
);

router.get(
  "/network/:network/address/:address/promises",
  accountController.getAccountPromises
);

router.get(
  "/network/:network/address/:address/rewards",
  accountController.getAccountRewards
);

module.exports = router;
