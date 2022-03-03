const {
  decodeAddress,
  signatureVerify,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

function isValidSignature(signedMessage, signature, address) {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);
  const result = signatureVerify(signedMessage, signature, hexPublicKey);
  return result.isValid;
}

module.exports = {
  isValidSignature,
};
