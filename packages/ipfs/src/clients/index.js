const { getLocalClient } = require("./local");
const { getInfuraClient } = require("./infura");

/**
 *
 * @param clientMode
 * @param clientOptions
 * @returns {IPFSHTTPClient[]}
 */
function getClients(clientMode, clientOptions) {
  if (clientMode.mode === 0) {
    return [
      getInfuraClient(
        clientOptions.infuraProjectId,
        clientOptions.infuraProjectSecret
      ),
      getLocalClient(clientOptions.localNodeIpOrUrl),
    ];
  }

  if (clientMode.mode === 1) {
    return [getLocalClient(clientOptions.localNodeIpOrUrl)];
  }

  if (clientMode.mode === 2) {
    return [
      getInfuraClient(
        clientOptions.infuraProjectId,
        clientOptions.infuraProjectSecret
      ),
    ];
  }

  throw new Error("Invalid IPFS clients creation mode");
}

module.exports = {
  getClients,
};
