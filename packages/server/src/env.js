const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/paid-qa";
const NODE_API_ENDPOINT =
  process.env.NODE_API_ENDPOINT || "http://localhost:3223";

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || "";
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET || "";
const LOCAL_IPFS_NODE_URL =
  process.env.LOCAL_IPFS_NODE_URL || "http://ipfs.dotask.cc:5001";

const USE_LOCAL_IFPS_NODE = ["true", "True", "TRUE", "1"].includes(
  process.env.USE_LOCAL_IFPS_NODE
);

module.exports = {
  MONGODB_URI,
  NODE_API_ENDPOINT,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
  LOCAL_IPFS_NODE_URL,
  USE_LOCAL_IFPS_NODE,
};
