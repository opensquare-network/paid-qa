const queue = require("async/queue");
const ipfsGatewayUrls = (
  process.env.IPFS_GATEWAY_URLS || "https://ipfs.infura.io/ipfs/"
).split(";");

async function fetchWithTimeout(url) {
  const abortController = new AbortController();
  const signal = abortController.signal;
  setTimeout(() => abortController.abort(), 5000);
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch, status ${res.status}, ${res.statusText}`);
  }

  const json = await res.json();
  return json;
}

async function fetchIpfsJson(cid) {
  try {
    return await Promise.any(
      ipfsGatewayUrls.map((ipfsGatewayUrl) =>
        fetchWithTimeout(`${ipfsGatewayUrl}${cid}`)
      )
    );
  } catch (e) {
    console.error(`fetchIpfsJson: ${e.message}, ${cid}`);
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
