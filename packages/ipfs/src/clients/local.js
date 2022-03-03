const { IPFS_TIMEOUT } = require("./common");
const { create } = require("ipfs-http-client");
let client;

/**
 *
 * @param url: local ipfs node ip or url, like '127.0.0.1'
 * @returns {IPFSHTTPClient}
 */
function getLocalClient(url) {
  if (!client) {
    client = create({
      host: url,
      port: 5001,
      protocol: 'http',
      timeout: IPFS_TIMEOUT,
    })
  }

  return client
}

module.exports = {
  getLocalClient,
}
