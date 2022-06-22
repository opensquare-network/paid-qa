const { decodeAddress } = require("@polkadot/util-crypto");

function toPublicKey(address) {
  return Buffer.from(decodeAddress(address)).toString("hex");
}

module.exports = {
  toPublicKey,
};
