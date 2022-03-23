const { encodeAddress } = require("@polkadot/util-crypto");

function isSamePublicKey(key1, key2) {
  return encodeAddress(key1, 42) === encodeAddress(key2, 42);
}

module.exports = {
  isSamePublicKey,
};
