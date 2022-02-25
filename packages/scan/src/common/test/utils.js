const { setApi, setProvider, getProvider } = require("../../chain/api");
const { ApiPromise, WsProvider } = require("@polkadot/api");

const polkadotEndpoint = "wss://polkadot.api.onfinality.io/public-ws";
const kusamaEndpoint = "wss://kusama.api.onfinality.io/public-ws";
const statemineEndpoint = "wss://statemine.api.onfinality.io/public-ws";

async function _setupApi(endpoint) {
  const provider = new WsProvider(endpoint, 10);
  const api = await ApiPromise.create({ provider });
  setProvider(provider);
  setApi(api);
}

async function setupPolkadotApi() {
  await _setupApi(polkadotEndpoint);
}

async function setupKusamaApi() {
  await _setupApi(kusamaEndpoint);
}

async function setupStatemineApi() {
  await _setupApi(statemineEndpoint);
}

async function disconnect() {
  const provider = getProvider();
  await provider.disconnect();
}

module.exports = {
  setupPolkadotApi,
  setupKusamaApi,
  setupStatemineApi,
  disconnect,
};
