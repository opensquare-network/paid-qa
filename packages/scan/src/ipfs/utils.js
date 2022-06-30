const queue = require("async/queue");
const ipfsGatewayUrl =
  process.env.IPFS_GATEWAY_URL || "https://ipfs.infura.io/ipfs/";

async function fetchIpfsJson(cid) {
  try {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setTimeout(() => abortController.abort(), 5000);
    const res = await fetch(`${ipfsGatewayUrl}${cid}`, { signal });
    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return json;
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

const ipfsFetchingQueue = queue((task, callback) => {
  console.log(`Fetching ${task.cid}`);
  fetchIpfsJson(task.cid)
    .then((json) => callback(null, json))
    .catch((err) => callback(err));
}, 10);

function fetchIpfsJsonInQueue(cid) {
  return new Promise((resolve) => {
    ipfsFetchingQueue.push({ cid }, (err, json) => resolve(json));
  });
}

module.exports = {
  fetchIpfsJson,
  fetchIpfsJsonInQueue,
};
