const Router = require("koa-router");

const router = new Router();

const chainFeatureRouters = [
  require("./features/remark/routes"),
  require("./features/tokeninfo/routes"),
];

const commonFeatureRouters = [];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of chainFeatureRouters) {
    router.use(
      "/:chain(kusama|polkadot|karura|khala|statemine|bifrost|kintsugi)",
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }

  app.use(router.routes());
};
