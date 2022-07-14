const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/paid-qa";
const SCAN_MONGODB_URI =
  process.env.SCAN_MONGODB_URI || "mongodb://localhost/qa-scan";

module.exports = {
  MONGODB_URI,
  SCAN_MONGODB_URI,
};
