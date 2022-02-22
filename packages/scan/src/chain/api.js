const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

async function getApi() {
  if (api) {
    return api;
  }

  const wsEndpoint = process.env.WS_ENDPOINT;
  if (!wsEndpoint) {
    throw new Error("WS_ENDPOINT not set");
  }

  provider = new WsProvider(wsEndpoint, 10);
  api = await ApiPromise.create({ provider });

  api.on("error", (err) => {
    console.error("api error, will restart:", err);
    process.exit(0);
  });
  api.on("disconnected", () => {
    console.error("api disconnected, will restart:");
    process.exit(0);
  });
  console.log(`Connected to endpoint:`, wsEndpoint);

  return api;
}

async function disconnect() {
  if (provider) {
    provider.disconnect();
  }
}

module.exports = {
  getApi,
  disconnect,
};
