const { setApi, setProvider, getProvider } = require("../../chain/api");
const { ApiPromise, WsProvider } = require("@polkadot/api");

const polkadotEndpoint = "wss://polkadot.api.onfinality.io/public-ws";

async function setupPolkadotApi() {
  const provider = new WsProvider(polkadotEndpoint, 10);
  const api = await ApiPromise.create({ provider });
  setProvider(provider);
  setApi(api);
}

async function disconnect() {
  const provider = getProvider();
  await provider.disconnect();
}

module.exports = {
  setupPolkadotApi,
  disconnect,
};
