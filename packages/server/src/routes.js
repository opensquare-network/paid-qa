const Router = require("koa-router");

const router = new Router();

const featureRouters = [
  require("./features/topic/routes"),
  require("./features/answer/routes"),
  require("./features/account/routes"),
  require("./features/support/routes"),
  require("./features/fund/routes"),
  require("./features/resolve/routes"),
  require("./features/notification/routes"),
  require("./features/report/routes"),
];

for (const r of featureRouters) {
  router.use(r.routes()).use(r.allowedMethods({ throw: true }));
}

module.exports = router;
