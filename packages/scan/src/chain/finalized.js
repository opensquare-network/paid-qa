const { getApi } = require("./api");

let latestFinalizedHeight = null;

async function subscribeFinalizedHeight() {
  const api = await getApi();

  await new Promise((resolve) => {
    api.rpc.chain.subscribeFinalizedHeads((header) => {
      latestFinalizedHeight = header.number.toNumber();
      resolve();
    });
  });
}

function getFinalizedHeight() {
  return latestFinalizedHeight;
}

module.exports = {
  subscribeFinalizedHeight,
  getFinalizedHeight,
};
