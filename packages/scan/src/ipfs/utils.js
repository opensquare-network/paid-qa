const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const ipfsGatewayUrl = process.env.IPFS_GATEWAY_URL || "https://ipfs.io/ipfs/";

async function fetchIpfsJson(cid) {
  try {
    const res = await fetch(`${ipfsGatewayUrl}${cid}`);
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

module.exports = {
  fetchIpfsJson,
};
