const { signatureVerify } = require("@polkadot/util-crypto");

function isValidSignature(signedMessage, signature, address) {
  try {
    const result = signatureVerify(signedMessage, signature, address);
    return result.isValid;
  } catch (e) {
    return false;
  }
}

module.exports = {
  isValidSignature,
};
