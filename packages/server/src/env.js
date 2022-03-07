const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/paid-qa";
const NODE_API_ENDPOINT =
  process.env.NODE_API_ENDPOINT || "http://localhost:3223";

module.exports = {
  MONGODB_URI,
  NODE_API_ENDPOINT,
};
