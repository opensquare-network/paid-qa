const { getClients, ClientOptions, ClientMode } = require("@paid-qa/ipfs");
const {
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
  LOCAL_IPFS_NODE_URL,
} = require("../env");

const [ipfsClient] = getClients(
  ClientMode.Infura,
  new ClientOptions(
    INFURA_PROJECT_ID,
    INFURA_PROJECT_SECRET,
    LOCAL_IPFS_NODE_URL
  )
);

async function ipfsAdd(data) {
  const added = await ipfsClient.add(JSON.stringify(data));
  return added;
}

module.exports = {
  ipfsAdd,
};
