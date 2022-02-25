const { CID } = require("multiformats")

function isCid(value) {
  try {
    const expectedCid = CID.parse(value);
    return !!expectedCid;
  } catch (e) {
    return false
  }
}

module.exports = {
  isCid,
}
