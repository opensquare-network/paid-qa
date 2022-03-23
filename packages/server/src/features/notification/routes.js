const Router = require("koa-router");
const notificationController = require("./notification.controller");

const router = new Router();

router.get(
  "/network/:network/address/:address/notifications",
  notificationController.getNotifications
);

router.get(
  "/network/:network/address/:address/notifications/discussion",
  notificationController.getDiscussionNotifications
);

router.get(
  "/network/:network/address/:address/notifications/reward",
  notificationController.getRewardNotifications
);

module.exports = router;
