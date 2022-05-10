const { extractPage } = require("../../utils/pagination");
const notificationService = require("../../services/notification");

async function getNotifications(ctx) {
  const { network, address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const result = await notificationService.getNotifications(
    network,
    address,
    page,
    pageSize
  );

  ctx.body = result;
}

async function getDiscussionNotifications(ctx) {
  const { network, address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const result = await notificationService.getDiscussionNotifications(
    network,
    address,
    page,
    pageSize
  );

  ctx.body = result;
}

async function getRewardNotifications(ctx) {
  const { network, address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);

  const result = await notificationService.getRewardNotifications(
    network,
    address,
    page,
    pageSize
  );

  ctx.body = result;
}

async function getUnreadNotifications(ctx) {
  const { network, address } = ctx.params;

  const result = await notificationService.getUnreadNotifications(
    network,
    address
  );

  ctx.body = result;
}

async function clearUnreadNotifications(ctx) {
  const { network, address, items } = ctx.params;

  const result = await notificationService.clearUnreadNotifications(
    network,
    address,
    items
  );

  ctx.body = result;
}

module.exports = {
  getNotifications,
  getDiscussionNotifications,
  getRewardNotifications,
  getUnreadNotifications,
  clearUnreadNotifications,
};
