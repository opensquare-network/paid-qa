const { HttpError } = require("../../utils/exc");
const { isValidSignature } = require("../../utils/signature");
const { Report } = require("../../models");
const { toPublicKey } = require("../../utils/address");

async function report(ctx) {
  const { data, address, network, signature } = ctx.request.body;

  const { ipfsCid, offTopic, inappropriate, spam, duplicate, somethingElse } =
    data || {};

  if (!ipfsCid) {
    throw new HttpError(400, { ipfsCid: ["IPFS CID is missing"] });
  }

  if (!address) {
    throw new HttpError(400, { address: ["Address is missing"] });
  }

  if (!network) {
    throw new HttpError(400, { network: ["Network is missing"] });
  }

  if (!signature) {
    throw new HttpError(400, { signature: ["Signature is missing"] });
  }

  // Check signature
  const msg = JSON.stringify(data);
  const isValid = isValidSignature(msg, signature, address);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  const signerPublicKey = toPublicKey(address);
  const exists = await Report.exists({ ipfsCid, signerPublicKey });
  if (exists) {
    throw new HttpError(400, "You have already reported this post");
  }

  await Report.create({
    ipfsCid,
    offTopic,
    inappropriate,
    spam,
    duplicate,
    somethingElse,
    data,
    network,
    signer: address,
    signature,
    signerPublicKey,
  });

  ctx.body = {
    success: true,
  };
}

module.exports = {
  report,
};
