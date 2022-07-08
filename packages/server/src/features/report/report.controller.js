const { HttpError } = require("../../utils/exc");
const {
  isValidSignature,
} = require("@paid-qa/backend-common/src/utils/signature");
const { Report, Topic, Answer } = require("@paid-qa/backend-common/src/models");
const { toPublicKey } = require("@paid-qa/backend-common/src/utils/address");

async function report(ctx) {
  const { data, address, network, signature } = ctx.request.body;

  const { refCid, offTopic, inappropriate, spam, duplicate, somethingElse } =
    data || {};

  if (!refCid) {
    throw new HttpError(400, { refCid: ["IPFS CID is missing"] });
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
  const exists = await Report.exists({ refCid, signerPublicKey });
  if (exists) {
    throw new HttpError(400, "You have already reported this post");
  }

  const isTopic = await Topic.exists({ cid: refCid });
  const isAnswer = await Answer.exists({ cid: refCid });

  let refCidType;
  if (isTopic) {
    refCidType = "topic";
  } else if (isAnswer) {
    refCidType = "answer";
  } else {
    throw new HttpError(400, "Invalid CID");
  }

  await Report.create({
    refCid,
    refCidType,
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
