const Router = require("koa-router");

const router = new Router();

const featureRouters = [
  require("./features/topic/routes"),
  require("./features/answer/routes"),
  require("./features/account/routes"),
  require("./features/support/routes"),
];

for (const r of featureRouters) {
  router.use(r.routes()).use(r.allowedMethods({ throw: true }));
}

module.exports = router;
