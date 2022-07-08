const { signatureVerify, cryptoWaitReady } = require("@polkadot/util-crypto");

async function isValidSignature(signedMessage, signature, address) {
  await cryptoWaitReady();
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
