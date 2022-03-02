const Router = require("koa-router");

const router = new Router();

const featureRouters = [
];

for (const r of featureRouters) {
  router.use(r.routes()).use(r.allowedMethods({ throw: true }));
}

module.exports = router;
