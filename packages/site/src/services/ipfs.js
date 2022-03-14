import Hash from "ipfs-only-hash";
import { CID } from "multiformats/cid";
import { Buffer } from "buffer";

export async function cidOf(obj) {
  const data = JSON.stringify(obj);
  const cidV0 = await Hash.of(Buffer.from(data));
  const cid = CID.parse(cidV0);
  return cid.toV1().toString();
}
