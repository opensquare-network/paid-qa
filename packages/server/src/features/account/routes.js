const Router = require("koa-router");
const accountController = require("./account.controller");

const router = new Router();

router.get(
  "/network/:network/address/:address/topics",
  accountController.getAccountTopics
);

router.get(
  "/network/:network/address/:address/promisedtopics",
  accountController.getAccountPromisedTopics
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
  "/network/:network/address/:address/funds",
  accountController.getAccountFunds
);

router.get(
  "/network/:network/address/:address/rewards",
  accountController.getAccountRewards
);

router.get(
  "/network/:network/address/:address",
  accountController.getAccountOverview
);

module.exports = router;
